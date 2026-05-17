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
	private const TARGET_VERSION = 1;

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
			$this->migrate_blob_to_per_module();
		}

		update_option( $this->version_option_key(), self::TARGET_VERSION, true );
	}

	/**
	 * Split the legacy `cartick_options` blob into per-module rows.
	 *
	 * Legacy shape: cartick_options[ <module_key> ][ <prefixed_setting> ].
	 * New shape:    cartick_module_<module_key> = [ <unprefixed_setting> => value ].
	 *
	 * The original `cartick_options` row is left intact for one release as a
	 * fallback so users can roll back if needed.
	 */
	private function migrate_blob_to_per_module(): void {
		$legacy = get_option( 'cartick_options' );
		if ( ! is_array( $legacy ) ) {
			return;
		}

		$map = $this->legacy_setting_map();

		foreach ( $map as $module_id => $spec ) {
			if ( empty( $legacy[ $spec['blob_key'] ] ) || ! is_array( $legacy[ $spec['blob_key'] ] ) ) {
				continue;
			}
			$source = $legacy[ $spec['blob_key'] ];

			// Translate old keys → new keys.
			$translated = array();
			foreach ( $spec['keys'] as $old_key => $new_key ) {
				if ( array_key_exists( $old_key, $source ) ) {
					$translated[ $new_key ] = $source[ $old_key ];
				}
			}

			// Enable flag comes from the legacy *_status field if present.
			if ( isset( $spec['status_key'] ) && ! empty( $source[ $spec['status_key'] ] ) ) {
				$this->settings_manager->set_module_enabled( $module_id, true );
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
				'blob_key' => 'cart_btn',
				// No legacy status flag — always considered active when the
				// row exists. Module defaults preserve old behavior.
				'keys'     => array(
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
				'keys'       => array(
					'oc_position' => 'position',
				),
			),
		);
	}
}
