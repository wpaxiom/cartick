<?php
/**
 *
 *  ██████╗ █████╗ ██████╗ ████████╗██╗ ██████╗██╗  ██╗
 * ██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝██║ ██╔╝
 * ██║     ███████║██████╔╝   ██║   ██║██║     █████╔╝
 * ██║     ██╔══██║██╔══██╗   ██║   ██║██║     ██╔═██╗
 * ╚██████╗██║  ██║██║  ██║   ██║   ██║╚██████╗██║  ██╗
 *  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝╚═╝  ╚═╝
 *
 * @package cartick
 * @author WpAxiom <info@wpaxiom.com>
 * @version 1.0.1
 * @since 1.0.0
 */

namespace WpAxiom\Cartick;

use WpAxiom\Cartick\Traits\Singleton;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Initialize Class Cartick
 */
final class Cartick {

	use singleton;

	/**
	 * Cartick Class Constructor
	 */
	public function __construct() {
		add_action( 'plugins_loaded', array( $this, 'init_data' ) );
		add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );
	}

	/**
	 * Initialize Plugin
	 */
	public function init_plugin(): void {
		if ( is_admin() ) {
			new Admin();
		} else {
			new Frontend();
		}
		new Cartick_Settings_Rest_Route();

		// Enable HPOS for WooCommerce
		add_action( 'before_woocommerce_init', array( $this, 'enable_hpos' ) );
	}

	/**
	 * Initialize plugin data
	 *
	 * @return void
	 */
	public function init_data(): void {
		$data = array(
			'cart_btn'    => array(
				'simple_text'          => 'Add to cart',
				'variable_text'        => 'Select Options',
				'grouped_text'         => 'Select Options',
				'external_text'        => 'Buy Now',
				'single_simple_text'   => 'Add to cart',
				'single_variable_text' => 'Add to cart',
				'single_grouped_text'  => 'Add to cart',
				'single_external_text' => 'Buy Now',
				'cart_btn_style'       => '',
				'cart_padding_top'     => 15,
				'cart_padding_right'   => 15,
				'cart_padding_bottom'  => 15,
				'cart_padding_left'    => 15,
				'cart_color'           => '#ffffff',
				'cart_background'      => '#000000',
			),
			'sticky_cart' => array(
				'sc_status'             => '',
				'sc_position'           => 'bottom',
				'sc_show_on_desktop'    => 1,
				'sc_show_on_mobile'     => 1,
				'sc_ajax_cart'          => 1,
				'sc_show_on_scroll'     => '',
				'sc_scroll_offset'      => '500',
				'sc_show_image'         => 1,
				'sc_show_price'         => 1,
				'sc_show_out_of_stock'  => 1,
				'sc_enable_on_simple'   => 1,
				'sc_enable_on_grouped'  => 1,
				'sc_enable_on_variable' => 1,
				'sc_enable_on_external' => 1,
			),
		);

		if ( ! get_option( 'cartick_options' ) ) {
			update_option( 'cartick_options', $data, true );
		}
	}

	/**
	 * Enable High-Performance Order Storage (HPOS)
	 *
	 * @return void
	 */
	public function enable_hpos() {
		if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
			\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', CARTICK_FILE, true );
		}
	}
}

/**
 * Initialize main plugin
 *
 * @return false|cartick
 */
function cartick() {
	return Cartick::init();
}

cartick();
