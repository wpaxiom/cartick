<?php
/**
 * Cartick Admin Menu
 *
 * @package cartick
 * @author WpAxiom <info@wpaxiom.com>
 * @version 1.0.0
 * @since 1.0.0
 */

namespace WpAxiom\Cartick\Admin;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Admin Menu Class
 */
class Admin_Menu {

	/**
	 * Initialize Admin Menu
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
	}

	/**
	 * Admin Menus
	 */
	public function admin_menu() {
		$hook = add_menu_page(
			'Cartick',
			'Cartick',
			'manage_options',
			'cartick-options',
			array( $this, 'cartick_options_callback' ),
			'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xNjYuMzggMEgzMy42MUMxNS4wNSAwIDAgMTUuMDUgMCAzMy42MlYxNjYuMzhDMCAxODQuOTUgMTUuMDUgMjAwIDMzLjYxIDIwMEgxNjYuMzhDMTg0Ljk0IDIwMCAyMDAgMTg0Ljk1IDIwMCAxNjYuMzhWMzMuNjJDMjAwIDE1LjA1IDE4NC45NCAwIDE2Ni4zOCAwWk0xNzAuNSA4MS4xNkMxNjYuNjkgODcuNDcgMTU5Ljc3IDkxLjY5IDE1MS44NiA5MS42OUMxNDQuMDQgOTEuNjkgMTM3LjE4IDg3LjU2IDEzMy4zNSA4MS4zN0MxMzMuMzQgODEuMzUgMTMzLjMyIDgxLjMzIDEzMy4zIDgxLjMxQzEzMi4zMSA4MC4wOCAxMzEuMjEgNzguNzggMTMwLjA1IDc3LjQxQzEyNS41NCA3Mi4wNyAxMjAuNDcgNjYuMDMgMTE4LjM4IDU5LjdDMTE3LjI1IDU2LjM5IDExOC45NyA0Ni4zNSAxMTkuNyA0Mi43OUMxMTkuODYgNDIuMSAxMTkuNTMgNDEuNCAxMTguOTEgNDEuMDZDMTE4LjY4IDQwLjkxIDExNi41OCAzOS43NyAxMTEuNDMgMzkuNzdIMTA5Ljk3QzEwMy4wOCA0MC4wNyA5Ny41OCA0Ny42OCA5Ni41OCA1OC40MkM5Ni4wMiA2NC43NSA5Ni45MSA3MC4yOSA5Ny42OCA3My42MUg3MS41MUM2Ni42NSA3My42MSA2Mi4zOSA3OC4xNSA2Mi4zOSA4My4zQzYyLjM5IDg2Ljc1IDYzLjY3IDg5LjM4IDY1LjI4IDkxLjAxQzYzLjI0IDkyLjQ0IDYxLjcgOTUuMDcgNjEuNyA5OC40M0M2MS43IDEwMS4yIDYyLjgzIDEwMy44MiA2NC43OCAxMDUuOEM2My41NyAxMDcuNTMgNjIuOTMgMTA5LjYxIDYyLjkzIDExMS42OUM2Mi45MyAxMTUuOTkgNjUuNjUgMTE5LjggNjkuNjQgMTIxLjQzQzY5LjI4IDEyMi41MiA2OS4wOCAxMjMuNiA2OS4wOCAxMjQuNzRDNjkuMDggMTMwLjIzIDczLjM1IDEzNC43MyA3OC45MyAxMzUuMjdDNzkuMTkgMTM1LjI3IDc5LjQ1IDEzNS4zMyA3OS43MyAxMzUuMzNIMTMyLjI4TDEzMy41NyAxMzUuMzlDMTM0LjA4IDEzNS4zNiAxMzQuNTkgMTM1LjMzIDEzNS4xIDEzNS4zQzEzNS4xNSAxMzUuMyAxMzUuMiAxMzUuMjkgMTM1LjI2IDEzNS4yOUgxMzUuMjdDMTM1LjM4IDEzNS4yOCAxMzUuNDggMTM1LjI4IDEzNS41OSAxMzUuMjdDMTM2LjI1IDEzNS4yMyAxMzYuOTEgMTM1LjE5IDEzNy41OCAxMzUuMTZDMTQ2LjYxIDEzNS4zMiAxNTMuODggMTQyLjY5IDE1My44OCAxNTEuNzZDMTUzLjg4IDE1Ni40IDE1MS45OCAxNjAuNiAxNDguOSAxNjMuNjFDMTQ4LjMgMTY0LjIxIDE0Ny42NCAxNjQuNzUgMTQ2Ljk1IDE2NS4yNUMxNDYuOTMgMTY1LjI3IDE0Ni45IDE2NS4yOSAxNDYuODcgMTY1LjMxQzE0Ni4zOCAxNjUuNjMgMTQ1Ljg4IDE2NS45NCAxNDUuMzggMTY2LjI1QzE0NS4xMiAxNjYuNDEgMTQ0Ljg2IDE2Ni41NyAxNDQuNiAxNjYuNzNDMTQ0LjE2IDE2NyAxNDMuNzIgMTY3LjI2IDE0My4yNyAxNjcuNTFDMTMxLjgxIDE3NC4xNCAxMTguNTEgMTc3Ljk0IDEwNC4zMSAxNzcuOTRDOTYuNTIgMTc3Ljk0IDg5IDE3Ni43OSA4MS44OSAxNzQuNjZDNDkuNzggMTY1LjAzIDI2LjM4IDEzNS4yNSAyNi4zOCAxMDBDMjYuMzggNjUuMzkgNDguOTUgMzYuMDQgODAuMTYgMjUuODhDODcuNzcgMjMuNCA5NS44OCAyMi4wNiAxMDQuMzEgMjIuMDZDMTMxLjIyIDIyLjA2IDE1NC45NCAzNS42OSAxNjguOTQgNTYuNDNDMTY5Ljc5IDU3LjY4IDE3MC42IDU4Ljk1IDE3MS4zNiA2MC4yNUMxNzIuODIgNjMuMTYgMTczLjYzIDY2LjQ1IDE3My42MyA2OS45MkMxNzMuNjMgNzQuMDMgMTcyLjQ5IDc3Ljg4IDE3MC41IDgxLjE2WiIgZmlsbD0iI0E3QUFBRCIvPgo8L3N2Zz4K',
			'5'
		);

		add_action( 'load-' . $hook, array( __CLASS__, 'admin_load' ) );
	}

	/**
	 * Admin Load
	 */
	public static function admin_load() {
		remove_all_actions( 'admin_notices' );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'admin_assets' ) );
	}

	/**
	 * Admin assets
	 */
	public static function admin_assets() {
		wp_enqueue_style( 'cartick-nunito-font', 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500&display=swap', array(), CARTICK_VERSION );
		wp_enqueue_style( 'cartick-poppins-font', 'https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap', array(), CARTICK_VERSION );
		wp_enqueue_style( 'cartick-admin', CARTICK_ASSETS . '/dist/css/admin.css', array(), CARTICK_VERSION );
		wp_enqueue_script( 'cartick-admin', CARTICK_ASSETS . '/dist/js/admin.js', array( 'jquery' ), CARTICK_VERSION, true );
		wp_enqueue_script( 'admin-js', CARTICK_URL . '/build/index.js', array( 'jquery', 'wp-element' ), CARTICK_VERSION, true );
		wp_localize_script( 'admin-js', 'cartickAdminSettings', array(
			'url'     => esc_url_raw( rest_url() ),
			'nonce'   => wp_create_nonce( 'wp_rest' ),
			'menus'   => cartick_nav_menus(),
			'version' => CARTICK_VERSION
		) );
	}

	/**
	 * Cartick Callback function
	 */
	public function cartick_options_callback() {

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You do not have sufficient permissions to access this page.', 'cartick' ) );
		}

		?>
			<div class="wrap">
				<div class="cartick-wrap" id="cartick-wrap">
					<div id="cartick-admin"></div>
				</div><!-- end .cartick-wrap -->
			</div>
		<?php
	}
}

// End of file Admin_Menu.php.
