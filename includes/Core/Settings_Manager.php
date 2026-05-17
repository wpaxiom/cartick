<?php
/**
 * Per-module settings storage.
 *
 * One option row tracks which modules are enabled; each module's settings live
 * in their own option row so they can be loaded on demand and migrated
 * independently.
 *
 * @package cartick
 */

namespace WpAxiom\Cartick\Core;

if ( ! defined( 'ABSPATH' ) ) exit;

class Settings_Manager {

	private string $prefix;

	public function __construct( string $prefix ) {
		$this->prefix = $prefix;
	}

	public function modules_option_key(): string {
		return $this->prefix . '_modules';
	}

	public function module_settings_key( string $module_id ): string {
		return $this->prefix . '_module_' . $module_id;
	}

	public function is_module_enabled( string $module_id ): bool {
		$modules = (array) get_option( $this->modules_option_key(), array() );
		return ! empty( $modules[ $module_id ] );
	}

	public function set_module_enabled( string $module_id, bool $enabled ): bool {
		$modules = (array) get_option( $this->modules_option_key(), array() );
		$modules[ $module_id ] = $enabled;
		return update_option( $this->modules_option_key(), $modules, true );
	}

	public function get_module_settings( string $module_id ): array {
		$value = get_option( $this->module_settings_key( $module_id ), array() );
		return is_array( $value ) ? $value : array();
	}

	public function get_module_setting( string $module_id, string $key ) {
		$settings = $this->get_module_settings( $module_id );
		return $settings[ $key ] ?? null;
	}

	public function update_module_settings( string $module_id, array $data ): bool {
		$existing = $this->get_module_settings( $module_id );
		$merged   = array_merge( $existing, $data );
		return update_option( $this->module_settings_key( $module_id ), $merged, false );
	}

	public function replace_module_settings( string $module_id, array $data ): bool {
		return update_option( $this->module_settings_key( $module_id ), $data, false );
	}
}
