<?php
/**
 * Cartick Settings Rest Route
 *
 * @package cartick
 * @author WpAxiom <info@wpaxiom.com>
 * @version 1.0.1
 * @since 1.0.0
 */

namespace WpAxiom\Cartick;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Settings Rest Route Class
 */
class Cartick_Settings_Rest_Route {

	/**
	 * Initialize Settings Rest Route
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'create_rest_routes' ));
	}

	/**
	 * Init Rest Route
	 */
	public function create_rest_routes(): void {
		register_rest_route( 'cartick/v1', '/settings', array(
			'methods'             => 'GET',
			'callback'            => array( $this, 'get_settings' ),
			'permission_callback' => array( $this, 'get_permission_settings' ),
		) );
		register_rest_route( 'cartick/v1', '/settings', array(
			'methods'             => 'POST',
			'callback'            => array( $this, 'save_settings' ),
			'permission_callback' => array( $this, 'save_permission_settings' ),
		) );
	}

	/**
	 * Options Data
	 *
	 * @return \string[][]
	 */
	public function options_data(): array {
		return array(
			'general'         => array(),
			'cart_btn'        => array(
				'status',
				'simple_text',
				'variable_text',
				'grouped_text',
				'external_text',
				'single_simple_text',
				'single_variable_text',
				'single_grouped_text',
				'single_external_text',
				'cart_btn_style',
				'cart_padding_top',
				'cart_padding_right',
				'cart_padding_bottom',
				'cart_padding_left',
				'cart_color',
				'cart_background',
			),
			'sticky_cart'     => array(
				'sc_status',
				'sc_position',
				'sc_show_on_desktop',
				'sc_show_on_mobile',
				'sc_ajax_cart',
				'sc_show_on_scroll',
				'sc_scroll_offset',
				'sc_show_image',
				'sc_show_price',
				'sc_show_out_of_stock',
				'sc_enable_on_simple',
				'sc_enable_on_grouped',
				'sc_enable_on_variable',
				'sc_enable_on_external',
			),
			'off_canvas_cart' => array(
				'oc_status',
				'oc_position',
				'oc_width',
				'oc_title',
				'oc_btn_position',
				'oc_btn_bg',
				'oc_btn_color',
				'oc_auto_open',
				'oc_anim_speed',
				'oc_show_count_in_header',
				'oc_show_images',
				'oc_empty_text',
				'oc_continue_url',
			),
			'menu_cart'       => array(
				'mc_status',
				'mc_select_menu_cart',
				'mc_display_cart',
				'mc_show_on_cart_page',
				'mc_show_on_checkout_page',
				'mc_display_cart_icon',
				'mc_menu_content',
				'mc_price_to_display',
				'mc_custom_css',
				'mc_menu_align',
				'mc_ajax_cart',
			),
		);
	}

	/**
	 * Get Route Settings
	 */
	public function get_settings() {
		return rest_ensure_response( get_option('cartick_options') );
	}

	/**
	 * Permission check for reading settings.
	 *
	 * Settings can include sensitive UI strings and custom CSS; restrict to
	 * users who can manage WooCommerce (or admins on non-WC sites).
	 */
	public function get_permission_settings(): bool {
		return current_user_can( 'manage_woocommerce' ) || current_user_can( 'manage_options' );
	}

	/**
	 * Save Route Settings.
	 *
	 * Merges the request body into the existing `cartick_options` blob —
	 * only fields actually present in the request are overwritten. The
	 * previous implementation initialised an empty $options and iterated
	 * every key in options_data(), which clobbered untouched fields to ""
	 * (sanitize_text_field(null)) on every save. That broke the Migrator's
	 * per-module sync: replace_module_settings() then persisted "" values,
	 * and the frontend's get_setting() falls back to schema defaults only
	 * when the stored value is null — not when it's "" — so user-invisible
	 * defaults were silently lost.
	 */
	public function save_settings( $res ) {

		$data_arr = $this->options_data();

		$options = (array) get_option( 'cartick_options', array() );

		foreach ( $data_arr as $key => $value_arr ) {
			if ( ! isset( $options[ $key ] ) || ! is_array( $options[ $key ] ) ) {
				$options[ $key ] = array();
			}
			foreach ( $value_arr as $field ) {
				$value = $res->get_param( $field );
				if ( null === $value ) {
					continue;
				}
				$options[ $key ][ $field ] = sanitize_text_field( $value );
			}
		}

		update_option( 'cartick_options', $options );

		// The admin still writes the legacy blob, but the frontend reads
		// per-module rows + the modules-enabled registry. Sync them on every
		// save so toggles/values take effect immediately.
		( new \WpAxiom\Cartick\Core\Migrator( 'cartick', cartick()->settings_manager() ) )
			->sync_blob_to_per_module();

		return rest_ensure_response( 'successfully updated' );
	}

	/**
	 * Permission check for writing settings.
	 *
	 * Plugin settings must not be writable by Authors. Require WooCommerce
	 * management capability (or admin) — same gate used for reads.
	 */
	public function save_permission_settings(): bool {
		return current_user_can( 'manage_woocommerce' ) || current_user_can( 'manage_options' );
	}

}

// End of file Cartick_Settings_Rest_Route.php.
