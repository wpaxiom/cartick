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
	 * Save Route Settings
	 */
	public function get_permission_settings(): bool {
		return true;
	}

	/**
	 * Save Route Settings
	 */
	public function save_settings( $res ) {

		$data_arr = $this->options_data();

		$options = array();
		foreach ( $data_arr as $key => $value_arr ) {
			foreach ( $value_arr as $value ) {
				$options[ $key ][ $value ] = sanitize_text_field( $res[ $value ]) ;
			}
		}

		update_option('cartick_options', $options);

		return rest_ensure_response('successfully updated');
	}

	/**
	 * Save Route Settings
	 */
	public function save_permission_settings(): bool {
		return current_user_can( 'publish_posts' );
	}

}

// End of file Cartick_Settings_Rest_Route.php.
