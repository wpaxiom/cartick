<?php
/**
 * REST controller for listing and toggling modules.
 *
 * Routes:
 *   GET  /cartick/v1/modules
 *   POST /cartick/v1/modules/{id}/enable
 *   POST /cartick/v1/modules/{id}/disable
 *
 * @package cartick
 */

namespace WpAxiom\Cartick\Admin\Rest;

use WpAxiom\Cartick\Core\Module_Registry;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

if ( ! defined( 'ABSPATH' ) ) exit;

class Modules_Controller {

	private Module_Registry $registry;

	public function __construct( Module_Registry $registry ) {
		$this->registry = $registry;
	}

	public function register(): void {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes(): void {
		register_rest_route( 'cartick/v1', '/modules', array(
			'methods'             => 'GET',
			'callback'            => array( $this, 'list' ),
			'permission_callback' => array( $this, 'permission' ),
		) );

		register_rest_route( 'cartick/v1', '/modules/(?P<id>[a-z0-9_]+)/enable', array(
			'methods'             => 'POST',
			'callback'            => array( $this, 'enable' ),
			'permission_callback' => array( $this, 'permission' ),
			'args'                => array(
				'id' => array( 'sanitize_callback' => 'sanitize_key' ),
			),
		) );

		register_rest_route( 'cartick/v1', '/modules/(?P<id>[a-z0-9_]+)/disable', array(
			'methods'             => 'POST',
			'callback'            => array( $this, 'disable' ),
			'permission_callback' => array( $this, 'permission' ),
			'args'                => array(
				'id' => array( 'sanitize_callback' => 'sanitize_key' ),
			),
		) );
	}

	public function permission(): bool {
		return current_user_can( 'manage_woocommerce' ) || current_user_can( 'manage_options' );
	}

	public function list(): WP_REST_Response {
		$out = array();
		foreach ( $this->registry->all() as $module ) {
			$out[] = array(
				'id'          => $module::id(),
				'name'        => $module::name(),
				'description' => $module::description(),
				'enabled'     => $module->is_enabled(),
			);
		}
		return rest_ensure_response( $out );
	}

	public function enable( WP_REST_Request $request ) {
		return $this->set_enabled( (string) $request['id'], true );
	}

	public function disable( WP_REST_Request $request ) {
		return $this->set_enabled( (string) $request['id'], false );
	}

	private function set_enabled( string $id, bool $enabled ) {
		$module = $this->registry->get( $id );
		if ( ! $module ) {
			return new WP_Error( 'cartick_module_not_found', __( 'Module not found.', 'cartick' ), array( 'status' => 404 ) );
		}
		$this->registry->settings_manager()->set_module_enabled( $id, $enabled );
		return rest_ensure_response( array(
			'id'      => $id,
			'enabled' => $enabled,
		) );
	}
}
