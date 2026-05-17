<?php
/**
 * Holds the set of available modules and boots the enabled ones.
 *
 * @package cartick
 */

namespace WpAxiom\Cartick\Core;

if ( ! defined( 'ABSPATH' ) ) exit;

class Module_Registry {

	/** @var Module[] keyed by module id */
	private array $modules = array();

	private Settings_Manager $settings_manager;

	public function __construct( Settings_Manager $settings_manager ) {
		$this->settings_manager = $settings_manager;
	}

	public function settings_manager(): Settings_Manager {
		return $this->settings_manager;
	}

	/**
	 * Register a module by its class name. Class must extend Core\Module.
	 */
	public function register( string $module_class ): void {
		if ( ! is_subclass_of( $module_class, Module::class ) ) {
			return;
		}
		/** @var Module $instance */
		$instance = new $module_class( $this->settings_manager );
		$this->modules[ $instance::id() ] = $instance;
	}

	public function get( string $id ): ?Module {
		return $this->modules[ $id ] ?? null;
	}

	/** @return Module[] */
	public function all(): array {
		return $this->modules;
	}

	/** @return Module[] */
	public function enabled(): array {
		return array_filter( $this->modules, static fn( Module $m ) => $m->is_enabled() );
	}

	/**
	 * Call register() on every enabled module. Safe to call once during
	 * plugins_loaded.
	 */
	public function boot(): void {
		foreach ( $this->enabled() as $module ) {
			$module->register();
		}
	}
}
