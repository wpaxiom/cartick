<?php
/**
 * REST controller for per-module settings.
 *
 * Routes:
 *   GET  /cartick/v1/modules/{id}/settings  → settings with defaults applied
 *   POST /cartick/v1/modules/{id}/settings  → schema-validated update
 *   GET  /cartick/v1/modules/{id}/schema    → field types/defaults (for UI)
 *
 * @package cartick
 */

namespace WpAxiom\Cartick\Admin\Rest;

use WpAxiom\Cartick\Core\Module_Registry;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

if ( ! defined( 'ABSPATH' ) ) exit;

class Settings_Controller {

	private Module_Registry $registry;

	public function __construct( Module_Registry $registry ) {
		$this->registry = $registry;
	}

	public function register(): void {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes(): void {
		register_rest_route( 'cartick/v1', '/modules/(?P<id>[a-z0-9_]+)/settings', array(
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_settings' ),
				'permission_callback' => array( $this, 'permission' ),
				'args'                => array(
					'id' => array( 'sanitize_callback' => 'sanitize_key' ),
				),
			),
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'save_settings' ),
				'permission_callback' => array( $this, 'permission' ),
				'args'                => array(
					'id' => array( 'sanitize_callback' => 'sanitize_key' ),
				),
			),
		) );

		register_rest_route( 'cartick/v1', '/modules/(?P<id>[a-z0-9_]+)/schema', array(
			'methods'             => 'GET',
			'callback'            => array( $this, 'get_schema' ),
			'permission_callback' => array( $this, 'permission' ),
			'args'                => array(
				'id' => array( 'sanitize_callback' => 'sanitize_key' ),
			),
		) );
	}

	public function permission(): bool {
		return current_user_can( 'manage_woocommerce' ) || current_user_can( 'manage_options' );
	}

	public function get_settings( WP_REST_Request $request ) {
		$module = $this->registry->get( (string) $request['id'] );
		if ( ! $module ) {
			return new WP_Error( 'cartick_module_not_found', __( 'Module not found.', 'cartick' ), array( 'status' => 404 ) );
		}
		return rest_ensure_response( $module->get_settings() );
	}

	public function save_settings( WP_REST_Request $request ) {
		$module = $this->registry->get( (string) $request['id'] );
		if ( ! $module ) {
			return new WP_Error( 'cartick_module_not_found', __( 'Module not found.', 'cartick' ), array( 'status' => 404 ) );
		}

		$body = $request->get_json_params();
		if ( ! is_array( $body ) ) {
			$body = $request->get_params();
		}
		// Don't accept route params as setting fields.
		unset( $body['id'] );

		$module->update_settings( $body );

		return rest_ensure_response( $module->get_settings() );
	}

	public function get_schema( WP_REST_Request $request ) {
		$module = $this->registry->get( (string) $request['id'] );
		if ( ! $module ) {
			return new WP_Error( 'cartick_module_not_found', __( 'Module not found.', 'cartick' ), array( 'status' => 404 ) );
		}
		return rest_ensure_response( $module->settings_schema() );
	}
}
