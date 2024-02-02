<?php
/**
 * Cartick helper functions
 *
 * @package cartick
 * @author WpAxiom <info@wpaxiom.com>
 * @version 1.0.0
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! function_exists( 'cartick_nav_menus' ) ) {
	/**
	 * Get All Nav Menus
	 *
	 * @return array
	 */
	function cartick_nav_menus(): array {
		$menu_obj = wp_get_nav_menus();
		$menu     = array();

		$menu[0]['label'] = esc_html__( 'Select Menu', 'cartick' );
		$menu[0]['value'] = esc_html__( 'none', 'cartick' );

		foreach ( $menu_obj as $key => $item ) {
			array(
				$menu[ $key + 1 ]['label'] = $item->name,
				$menu[ $key + 1 ]['value'] = $item->slug,
			);
		}
		return $menu;
	}
}

if ( ! function_exists( 'cartick_mc_classes' ) ) {
	/**
	 * Button Classes
	 *
	 * @return string
	 */
	function cartick_mc_classes(): string {
		$classes[] = 'products posterlaab-products columns-' . esc_attr( wc_get_loop_prop( 'columns' ) );
		$classes   = apply_filters( 'posterlaab_product_loop_classes', $classes );
		$classes   = array_unique( array_filter( $classes ) );

		return implode( ' ', $classes );
	}
}

if ( ! function_exists( 'cartick_options' ) ) {
	/**
	 * Fetch Cartick Options
	 *
	 * @param $option_tab
	 * @param string $option_name
	 * @param false $int
	 *
	 * @return string
	 */
	function cartick_options( $option_tab , string $option_name = '', bool $int = false ): string {
		$cartick_option = get_option( 'cartick_options' );
		if ( $cartick_option && isset( $cartick_option[ $option_tab ] ) ) {
			if ( $option_name ) {
				if ( $int ) {
					$options = (int)$cartick_option[ $option_tab ][ $option_name ];
				} else {
					$options = $cartick_option[ $option_tab ][ $option_name ];
				}           
			} else {
				$options = $cartick_option[ $option_tab ];
			}
			return $options;
		}
		return false;
	}
}

// End of file cartick-helper.php.
