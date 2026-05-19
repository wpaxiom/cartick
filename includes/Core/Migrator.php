<?php
/**
 * One-shot data migrations, version-gated by an option.
 *
 * @package cartick
 */

namespace WpAxiom\Cartick\Core;

if ( ! defined( 'ABSPATH' ) ) exit;

class Migrator {

	private string $prefix;
	private Settings_Manager $settings_manager;

	/** Bump when adding a new migration step. */
	private const TARGET_VERSION = 3;

	public function __construct( string $prefix, Settings_Manager $settings_manager ) {
		$this->prefix           = $prefix;
		$this->settings_manager = $settings_manager;
	}

	private function version_option_key(): string {
		return $this->prefix . '_db_version';
	}

	public function run(): void {
		$current = (int) get_option( $this->version_option_key(), 0 );
		if ( $current >= self::TARGET_VERSION ) {
			return;
		}

		if ( $current < 1 ) {
			$this->sync_blob_to_per_module();
		}

		if ( $current < 2 ) {
			// Add-to-Cart historically had no module-level on/off flag — the
			// label filters always ran. Default cart_btn.status to enabled
			// so existing installs preserve that behavior after this upgrade.
			$legacy = get_option( 'cartick_options' );
			if ( is_array( $legacy ) && isset( $legacy['cart_btn'] ) && is_array( $legacy['cart_btn'] ) ) {
				if ( ! array_key_exists( 'status', $legacy['cart_btn'] ) ) {
					$legacy['cart_btn']['status'] = 1;
					update_option( 'cartick_options', $legacy );
				}
			}
			$this->sync_blob_to_per_module();
		}

		if ( $current < 3 ) {
			// The previous save endpoint clobbered every declared field with
			// sanitize_text_field($res[$field]) — which for missing request
			// fields returns "" — overwriting user-untouched settings with
			// empty strings. The frontend's get_setting() only falls back to
			// schema defaults when the stored value is null, not "", so all
			// these empties produced subtly-wrong renders (width = 280 clamp
			// instead of 380, show_images appearing off, etc.).
			//
			// Purge empty non-boolean values from the legacy blob and re-sync
			// so the per-module rows lose the empties too. Deliberate boolean
			// false values (also stored as "" by sanitize_text_field) are
			// preserved via the bool_keys list per module.
			$legacy = get_option( 'cartick_options' );
			if ( is_array( $legacy ) ) {
				$dirty = false;
				foreach ( $this->legacy_setting_map() as $spec ) {
					$blob_key  = $spec['blob_key'];
					$bool_keys = $spec['bool_keys'] ?? array();
					if ( empty( $legacy[ $blob_key ] ) || ! is_array( $legacy[ $blob_key ] ) ) {
						continue;
					}
					foreach ( $legacy[ $blob_key ] as $field => $value ) {
						if ( '' !== $value || in_array( $field, $bool_keys, true ) ) {
							continue;
						}
						// Don't drop the legacy status field — its empty value
						// is the explicit "module disabled" state.
						if ( isset( $spec['status_key'] ) && $field === $spec['status_key'] ) {
							continue;
						}
						unset( $legacy[ $blob_key ][ $field ] );
						$dirty = true;
					}
				}
				if ( $dirty ) {
					update_option( 'cartick_options', $legacy );
				}
			}
			// Wipe per-module rows so the next sync rebuilds them cleanly
			// (replace_module_settings is a full replace, not a merge).
			foreach ( array_keys( $this->legacy_setting_map() ) as $module_id ) {
				delete_option( $this->settings_manager->module_settings_key( $module_id ) );
			}
			$this->sync_blob_to_per_module();
		}

		update_option( $this->version_option_key(), self::TARGET_VERSION, true );
	}

	/**
	 * Copy values from the legacy `cartick_options` blob into the per-module
	 * rows + the modules-enabled registry. Runs on first upgrade (via run())
	 * AND after every admin save so the frontend (which reads per-module
	 * storage) stays in sync with the legacy blob the admin still writes.
	 *
	 * Legacy shape: cartick_options[ <blob_key> ][ <prefixed_setting> ].
	 * New shape:    cartick_module_<module_id> = [ <unprefixed_setting> => value ].
	 */
	public function sync_blob_to_per_module(): void {
		$legacy = get_option( 'cartick_options' );
		if ( ! is_array( $legacy ) ) {
			return;
		}

		$map = $this->legacy_setting_map();

		foreach ( $map as $module_id => $spec ) {
			if ( empty( $legacy[ $spec['blob_key'] ] ) || ! is_array( $legacy[ $spec['blob_key'] ] ) ) {
				continue;
			}
			$source    = $legacy[ $spec['blob_key'] ];
			$bool_keys = $spec['bool_keys'] ?? array();

			// Translate old keys → new keys. Empty non-boolean values are
			// skipped so the per-module row stays absent for those fields,
			// letting Core\Module::get_setting() fall back to the schema
			// default. (Booleans are kept because sanitize_text_field(false)
			// produces "" — losing them would resurrect a deliberate "off".)
			$translated = array();
			foreach ( $spec['keys'] as $old_key => $new_key ) {
				if ( ! array_key_exists( $old_key, $source ) ) {
					continue;
				}
				$value = $source[ $old_key ];
				if ( '' === $value && ! in_array( $old_key, $bool_keys, true ) ) {
					continue;
				}
				$translated[ $new_key ] = $value;
			}

			// Enable flag mirrors the legacy *_status field — both directions,
			// so disabling in admin actually disables the module.
			if ( isset( $spec['status_key'] ) && array_key_exists( $spec['status_key'], $source ) ) {
				$this->settings_manager->set_module_enabled( $module_id, ! empty( $source[ $spec['status_key'] ] ) );
			}

			if ( ! empty( $translated ) ) {
				$this->settings_manager->replace_module_settings( $module_id, $translated );
			}
		}
	}

	/**
	 * Maps legacy prefixed setting keys → clean per-module keys.
	 *
	 * `status_key`, when set, is the legacy field whose truthy value flips
	 * the module's enabled flag. `keys` translates old setting names to new.
	 * Setting names not listed are dropped.
	 */
	private function legacy_setting_map(): array {
		return array(
			'sticky_cart'     => array(
				'blob_key'   => 'sticky_cart',
				'status_key' => 'sc_status',
				'bool_keys'  => array(
					'sc_show_on_desktop', 'sc_show_on_mobile', 'sc_ajax_cart',
					'sc_show_on_scroll', 'sc_show_image', 'sc_show_price',
					'sc_show_out_of_stock', 'sc_enable_on_simple',
					'sc_enable_on_grouped', 'sc_enable_on_variable',
					'sc_enable_on_external',
				),
				'keys'       => array(
					'sc_position'           => 'position',
					'sc_show_on_desktop'    => 'show_on_desktop',
					'sc_show_on_mobile'     => 'show_on_mobile',
					'sc_ajax_cart'          => 'ajax_cart',
					'sc_show_on_scroll'     => 'show_on_scroll',
					'sc_scroll_offset'      => 'scroll_offset',
					'sc_show_image'         => 'show_image',
					'sc_show_price'         => 'show_price',
					// Old name was misleading: the flag actually means
					// "hide when out of stock". Renamed during migration.
					'sc_show_out_of_stock'  => 'hide_when_out_of_stock',
					'sc_enable_on_simple'   => 'enable_on_simple',
					'sc_enable_on_grouped'  => 'enable_on_grouped',
					'sc_enable_on_variable' => 'enable_on_variable',
					'sc_enable_on_external' => 'enable_on_external',
				),
			),
			'add_to_cart'     => array(
				'blob_key'   => 'cart_btn',
				'status_key' => 'status',
				'bool_keys'  => array( 'cart_btn_style' ),
				'keys'       => array(
					'simple_text'          => 'simple_text',
					'variable_text'        => 'variable_text',
					'grouped_text'         => 'grouped_text',
					'external_text'        => 'external_text',
					'single_simple_text'   => 'single_simple_text',
					'single_variable_text' => 'single_variable_text',
					'single_grouped_text'  => 'single_grouped_text',
					'single_external_text' => 'single_external_text',
					'cart_btn_style'       => 'enable_custom_style',
					'cart_padding_top'     => 'padding_top',
					'cart_padding_right'   => 'padding_right',
					'cart_padding_bottom'  => 'padding_bottom',
					'cart_padding_left'    => 'padding_left',
					'cart_color'           => 'color',
					'cart_background'      => 'background',
				),
			),
			'menu_cart'       => array(
				'blob_key'   => 'menu_cart',
				'status_key' => 'mc_status',
				'bool_keys'  => array(
					'mc_display_cart', 'mc_show_on_cart_page',
					'mc_show_on_checkout_page', 'mc_display_cart_icon',
					'mc_ajax_cart',
				),
				'keys'       => array(
					'mc_select_menu_cart'      => 'select_menu',
					'mc_display_cart'          => 'display_cart',
					'mc_show_on_cart_page'     => 'show_on_cart_page',
					'mc_show_on_checkout_page' => 'show_on_checkout_page',
					'mc_display_cart_icon'     => 'display_cart_icon',
					'mc_menu_content'          => 'menu_content',
					'mc_price_to_display'      => 'price_to_display',
					// The legacy `mc_custom_css` field was a CSS class name
					// (used in classes()), not raw CSS. Renamed for clarity.
					'mc_custom_css'            => 'custom_css_class',
					'mc_menu_align'            => 'menu_align',
					'mc_ajax_cart'             => 'ajax_cart',
				),
			),
			'off_canvas_cart' => array(
				'blob_key'   => 'off_canvas_cart',
				'status_key' => 'oc_status',
				'bool_keys'  => array(
					'oc_auto_open', 'oc_show_count_in_header', 'oc_show_images',
				),
				'keys'       => array(
					'oc_position'             => 'position',
					'oc_width'                => 'width',
					'oc_title'                => 'title',
					'oc_btn_position'         => 'btn_position',
					'oc_btn_bg'               => 'btn_bg',
					'oc_btn_color'            => 'btn_color',
					'oc_auto_open'            => 'auto_open',
					'oc_anim_speed'           => 'anim_speed',
					'oc_show_count_in_header' => 'show_count_in_header',
					'oc_show_images'          => 'show_images',
					'oc_empty_text'           => 'empty_text',
					'oc_continue_url'         => 'continue_url',
				),
			),
		);
	}
}
