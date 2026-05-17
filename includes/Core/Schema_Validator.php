<?php
/**
 * Type-checks and sanitizes incoming settings against a module's schema.
 *
 * @package cartick
 */

namespace WpAxiom\Cartick\Core;

if ( ! defined( 'ABSPATH' ) ) exit;

class Schema_Validator {

	private array $schema;

	public function __construct( array $schema ) {
		$this->schema = $schema;
	}

	/**
	 * Validate input against the schema. Unknown keys are dropped. Keys that
	 * are present but malformed fall back to the schema default (or are
	 * dropped when no default exists).
	 */
	public function validate( array $input ): array {
		$out = array();
		foreach ( $this->schema as $key => $def ) {
			if ( ! array_key_exists( $key, $input ) ) {
				continue;
			}
			$clean = $this->coerce( $input[ $key ], $def );
			if ( null !== $clean ) {
				$out[ $key ] = $clean;
			}
		}
		return $out;
	}

	private function coerce( $value, array $def ) {
		$type = $def['type'] ?? 'string';

		switch ( $type ) {
			case 'bool':
				return rest_sanitize_boolean( $value );

			case 'int':
				$int = (int) $value;
				if ( isset( $def['min'] ) && $int < $def['min'] ) {
					$int = (int) $def['min'];
				}
				if ( isset( $def['max'] ) && $int > $def['max'] ) {
					$int = (int) $def['max'];
				}
				return $int;

			case 'float':
				return (float) $value;

			case 'enum':
				$options = $def['options'] ?? array();
				return in_array( $value, $options, true ) ? $value : ( $def['default'] ?? null );

			case 'color':
				$hex = sanitize_hex_color( (string) $value );
				return null !== $hex ? $hex : ( $def['default'] ?? null );

			case 'css':
				// Strip tags to prevent </style> escape vectors; do NOT
				// pass through sanitize_text_field, which kills newlines.
				return wp_strip_all_tags( (string) $value );

			case 'textarea':
				return sanitize_textarea_field( (string) $value );

			case 'url':
				return esc_url_raw( (string) $value );

			case 'string':
			default:
				return sanitize_text_field( (string) $value );
		}
	}
}
