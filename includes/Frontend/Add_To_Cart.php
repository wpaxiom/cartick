<?php
/**
 * Cartick Add to Cart
 *
 * @package cartick
 * @author WpAxiom <info@wpaxiom.com>
 * @version 1.0.0
 * @since 1.0.0
 */

namespace WpAxiom\Cartick\Frontend;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Initialize Off_Canvas_Cart Class
 */
class Add_To_Cart {
	/**
	 * Off_Canvas_Cart Class Constructor
	 */
	public function __construct() {
		add_filter( 'woocommerce_product_single_add_to_cart_text', array( $this, 'add_to_cart_button_text_single' ), 10, 2 );
		add_filter( 'woocommerce_product_add_to_cart_text', array( $this, 'add_to_cart_button_text_archives' ), 10, 2 );
		add_filter( 'body_class', array( $this, 'body_class' ) );
		add_action( 'wp_head', array( $this, 'add_to_cart_styles' ) );
	}

	/**
     * Product single button text
     *
	 * @param $text
	 * @param $product
	 *
	 * @return string
	 */
	public function add_to_cart_button_text_single( $text, $product ): string {
		if ( 'simple' === $product->get_type() ) {
			$text = cartick_options( 'cart_btn', 'single_simple_text' );
		} elseif ( 'variable' === $product->get_type() ) {
			$text = cartick_options( 'cart_btn', 'single_variable_text' );
		} elseif ( 'grouped' === $product->get_type() ) {
			$text = cartick_options( 'cart_btn', 'single_grouped_text' );
		} elseif ( 'external' === $product->get_type() ) {
			$text = cartick_options( 'cart_btn', 'single_external_text' );
		}
		return $text;
	}

	/**
     * Archive page cart button text
     *
	 * @param $text
	 * @param $product
	 *
	 * @return string
	 */
	public function add_to_cart_button_text_archives( $text, $product ): string {
        if ( ! $product ) {
            return false;
        }

		if ( 'simple' === $product->get_type() ) {
			$text = cartick_options( 'cart_btn', 'simple_text' );
		} elseif ( 'variable' === $product->get_type() ) {
			$text = cartick_options( 'cart_btn', 'variable_text' );
		} elseif ( 'grouped' === $product->get_type() ) {
			$text = cartick_options( 'cart_btn', 'grouped_text' );
		} elseif ( 'external' === $product->get_type() ) {
			$text = cartick_options( 'cart_btn', 'external_text' );
		}

		return apply_filters( 'cartick_archive_add_to_cart_text', $text, $product );
	}

	/**
     * Cartick Body class for cart button
     *
	 * @param $classes
	 *
	 * @return array
	 */
	public function body_class( $classes ): array {
		if ( class_exists( 'WooCommerce' ) && ( is_shop() || is_product() ) && cartick_options( 'cart_btn', 'cart_btn_style', true ) ) {
			$classes[] = 'cartick-cart-btn';
		}
		return $classes;
	}


	/**
	 * WooCommerce Cart button styles
	 *
	 * @return void
	 */
	public function add_to_cart_styles(): void {
		if ( cartick_options( 'cart_btn', 'cart_btn_style', true ) ) {
			?>
			<style class="cartick-cart-btn-styles">
				.cartick-cart-btn .button {
					padding-top: <?php echo esc_html( cartick_options( 'cart_btn', 'cart_padding_top' ) . 'px' ); ?>;
					padding-right: <?php echo esc_html( cartick_options( 'cart_btn', 'cart_padding_right' ) . 'px' ); ?>;
					padding-bottom: <?php echo esc_html( cartick_options( 'cart_btn', 'cart_padding_bottom' ) . 'px' ); ?>;
					padding-left: <?php echo esc_html( cartick_options( 'cart_btn', 'cart_padding_left' ) . 'px' ); ?>;
					color: <?php echo esc_html( cartick_options( 'cart_btn', 'cart_color' ) ); ?>;
					background-color: <?php echo esc_html( cartick_options( 'cart_btn', 'cart_background' ) ); ?>;
				}
			</style>
			<?php
		}
	}

}
