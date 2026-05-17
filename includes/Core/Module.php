<?php
/**
 * Base class for plugin feature modules.
 *
 * Each feature (sticky cart, side cart, etc.) extends this. The registry
 * instantiates registered modules with a shared Settings_Manager, then calls
 * register() only on modules whose enabled flag is set.
 *
 * @package cartick
 */

namespace WpAxiom\Cartick\Core;

if ( ! defined( 'ABSPATH' ) ) exit;

abstract class Module {

	protected Settings_Manager $settings_manager;

	public function __construct( Settings_Manager $settings_manager ) {
		$this->settings_manager = $settings_manager;
	}

	/** Stable, machine-readable identifier (snake_case). */
	abstract public static function id(): string;

	/** Human-readable name for the admin UI. */
	abstract public static function name(): string;

	/** Short description for the admin UI. */
	abstract public static function description(): string;

	/**
	 * Schema describing every setting this module accepts: type, default,
	 * and (where applicable) constraints. Drives both validation and UI.
	 */
	abstract public function settings_schema(): array;

	/**
	 * Hook the module into WordPress. Called only when the module is enabled.
	 */
	abstract public function register(): void;

	public function is_enabled(): bool {
		return $this->settings_manager->is_module_enabled( static::id() );
	}

	public function get_setting( string $key, $fallback = null ) {
		$value = $this->settings_manager->get_module_setting( static::id(), $key );
		if ( null !== $value ) {
			return $value;
		}
		$schema = $this->settings_schema();
		if ( isset( $schema[ $key ]['default'] ) ) {
			return $schema[ $key ]['default'];
		}
		return $fallback;
	}

	public function get_settings(): array {
		return array_merge( $this->default_settings(), $this->settings_manager->get_module_settings( static::id() ) );
	}

	public function default_settings(): array {
		$out = array();
		foreach ( $this->settings_schema() as $key => $def ) {
			if ( array_key_exists( 'default', $def ) ) {
				$out[ $key ] = $def['default'];
			}
		}
		return $out;
	}

	public function update_settings( array $data ): bool {
		$validator = new Schema_Validator( $this->settings_schema() );
		$clean     = $validator->validate( $data );
		return $this->settings_manager->update_module_settings( static::id(), $clean );
	}
}
