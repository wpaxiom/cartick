<?php
/**
 * Plugin Name:       Cartick - Advanced Cart for WooCommerce
 * Plugin URI:        https://wpaxiom.com/cartick
 * Description:       Cartick is a powerful WordPress plugin designed exclusively for WooCommerce, enhancing your online store's user experience with a range of innovative cart features.
 * Version:           1.0.1
 * Author:            WpAxiom
 * Author URI:        https://wpaxiom.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       cartick
 * Domain Path:       /languages
 *
 *  Requires PHP: 7.4
 *  Requires at least: 5.8
 *  Tested up to: 6.4
 *  WC requires at least: 6.3
 *  WC tested up to: 8.5
 *
 * @package cartick
 * @author WpAxiom <info@wpaxiom.com>
 * @version 1.0.1
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! defined( 'CARTICK_VERSION' ) ) {
	define( 'CARTICK_VERSION', '1.0.0' );
}

if ( ! defined( 'CARTICK_FILE' ) ) {
	define( 'CARTICK_FILE', __FILE__ );
}

if ( ! defined( 'CARTICK_PATH' ) ) {
	define( 'CARTICK_PATH', plugin_dir_path( CARTICK_FILE ) );
}

if ( ! defined( 'CARTICK_URL' ) ) {
	define( 'CARTICK_URL', plugins_url( 'cartick' ) );
}

if ( ! defined( 'CARTICK_ASSETS' ) ) {
	define( 'CARTICK_ASSETS', CARTICK_URL . '/assets' );
}

/**
 * Cartick helper
 */
include 'cartick-helper.php';

/**
 * Composer autoload
 */

if ( file_exists( CARTICK_PATH . '/vendor/autoload.php' ) ) {

	require_once CARTICK_PATH . '/vendor/autoload.php';

	/**
	 * Plugin Initializer.
	 */
	function cartick() {
		return WpAxiom\Cartick\Cartick::init();
	}
	// Initialize.
	cartick();

} else {
	add_action(
		'admin_notices',
		function () {
		?>
		<div class="notice notice-error notice-alt">
			<p><?php esc_html_e( 'Cannot initialize “Cartick” plugin. <code>vendor/autoload.php</code> is missing. Please run <code>composer dump-autoload -o</code> within the this plugin directory.', 'cartick' ); ?></p>
		</div>
		<?php
		}
	);
}

// End of file cartick.php.
