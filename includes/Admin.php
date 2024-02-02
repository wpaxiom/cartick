<?php
/**
 * Cartick Admin
 *
 * @package cartick
 * @author WpAxiom <info@wpaxiom.com>
 * @version 1.0.0
 * @since 1.0.0
 */

namespace WpAxiom\Cartick;

use WpAxiom\Cartick\Admin\Admin_Menu;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Admin Menu Class
 */
class Admin {

	private static $loaaded = false;

	/**
	 * Initialize Admin Menu
	 */
	public function __construct() {
		if ( class_exists( 'WooCommerce' ) ) {
			$this->init_classes();
			add_filter ('plugin_action_links', [ $this, 'plugin_action_link' ], 10, 2);
		} else {
			add_action( 'admin_notices', array( $this, 'error_notice' ) );
		}
	}

	/**
	 * Init Frontend Classes
	 *
	 * @return void
	 */
	public function init_classes(): void {
		if ( self::$loaaded ) {
			return;
		}

		self::$loaaded = true;

		new Admin_Menu();
	}

	public function plugin_action_link( $default_actions, $cartick_file ): array {
		$cartick_actions = array();

		if ( basename( CARTICK_PATH ). '/cartick.php' === $cartick_file ) {
			// translators: Cartick admin url
			$cartick_actions['cartick_settings'] = sprintf( __( '<a href="%s">Settings</a>', 'cartick' ), esc_url( admin_url( 'admin.php?page=cartick-options' ) ) );
		}

		return array_merge( $cartick_actions, $default_actions );
	}

	/**
	 * Admin Error if WooCommerce not active
	 *
	 * @return void
	 */
	public function error_notice(): void {
		printf(
			'<div class="notice notice-error is-dismissible"><p>%s</p></div>',
			esc_html__( 'Cartick is enabled but not effective. It requires WooCommerce in order to work.', 'cartick' )
		);
	}
}

// End of file Admin.php.
