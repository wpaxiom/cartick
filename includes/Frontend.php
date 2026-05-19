<?php
/**
 * Frontend asset bootstrapper.
 *
 * Feature behavior lives in Modules/*; this class is now responsible only for
 * enqueueing the shared frontend stylesheet and script, plus localizing data
 * those scripts need.
 *
 * @package cartick
 */

namespace WpAxiom\Cartick;

use WpAxiom\Cartick\Modules\Sticky_Cart\Module as Sticky_Cart_Module;
use WpAxiom\Cartick\Modules\Off_Canvas_Cart\Module as Off_Canvas_Cart_Module;

if ( ! defined( 'ABSPATH' ) ) exit;

class Frontend {

	public function __construct() {
		if ( class_exists( 'WooCommerce' ) ) {
			add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue_assets' ) );
		}
	}

	public static function enqueue_assets(): void {
		wp_enqueue_style( 'cartick-style', CARTICK_ASSETS . '/dist/css/cartick.css', array(), CARTICK_VERSION );
		wp_enqueue_script( 'cartick-script', CARTICK_ASSETS . '/dist/js/cartick.js', array( 'jquery' ), CARTICK_VERSION, true );

		wp_localize_script( 'cartick-script', 'cartickSettings', array(
			'sc_offset'     => self::sticky_cart_scroll_offset(),
			'oc_auto_open'  => self::oc_auto_open(),
		) );
	}

	private static function sticky_cart_scroll_offset(): int {
		$registry = cartick()->module_registry();
		$module   = $registry->get( Sticky_Cart_Module::id() );
		if ( ! $module instanceof Sticky_Cart_Module ) {
			return 0;
		}
		return (int) $module->get_setting( 'scroll_offset' );
	}

	private static function oc_auto_open(): bool {
		$registry = cartick()->module_registry();
		$module   = $registry->get( Off_Canvas_Cart_Module::id() );
		if ( ! $module instanceof Off_Canvas_Cart_Module ) {
			return false;
		}
		return (bool) $module->get_setting( 'auto_open' );
	}
}
