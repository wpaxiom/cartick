<?php
/**
 * Cartick Frontend
 *
 * @package cartick
 * @author WpAxiom <info@wpaxiom.com>
 * @version 1.0.0
 * @since 1.0.0
 */

namespace WpAxiom\Cartick;

use WpAxiom\Cartick\Frontend\Add_To_Cart;
use WpAxiom\Cartick\Frontend\Menu_Cart;
use WpAxiom\Cartick\Frontend\Off_Canvas_Cart;
use WpAxiom\Cartick\Frontend\Sticky_Cart;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Initialize Frontend Class
 */
class Frontend {

	private static $loaaded = false;

	/**
	 * Frontend Class Constructor
	 */
	public function __construct() {
		if ( class_exists( 'WooCommerce' ) ) {
			$this->init_classes();
			add_action( 'wp_enqueue_scripts', array( __CLASS__, 'cartick_assets' ) );
		}
	}

	/**
	 * Init Frontend Classes
	 *
	 * @return void
	 */
	public function init_classes(): void {
		new Sticky_Cart();
		//new Off_Canvas_Cart();
		new Add_To_Cart();
		new Menu_Cart();
	}

	/**
	 * Cartick Assets
	 *
	 * @return void
	 */
	public static function cartick_assets(): void {
		wp_enqueue_style( 'cartick-style', CARTICK_ASSETS . '/dist/css/cartick.css', array(), CARTICK_VERSION );
		wp_enqueue_script( 'cartick-script', CARTICK_ASSETS . '/dist/js/cartick.js', array( 'jquery' ), CARTICK_VERSION, true );
		wp_localize_script( 'cartick-script', 'cartickSettings', array(
			'sc_offset' => cartick_options( 'sticky_cart', 'sc_scroll_offset' ) ? cartick_options( 'sticky_cart', 'sc_scroll_offset' ) : '',
		) );
	}
}

// End of file Admin.php.
