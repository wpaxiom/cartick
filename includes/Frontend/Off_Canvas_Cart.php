<?php
/**
 * Cartick Off Canvas Cart
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
class Off_Canvas_Cart {
	/**
	 * Off_Canvas_Cart Class Constructor
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'admin_assets' ) );
		add_action( 'wp_footer', array( $this, 'off_canvas_cart_callback' ) );
		add_filter( 'woocommerce_add_to_cart_fragments', array( __CLASS__, 'cart_content_fragments' ) );
	}

	/**
	 * Off Canvas Cart Callback
	 *
	 * @return void
	 */
	public function off_canvas_cart_callback(): void {
		if ( ! cartick_options( 'off_canvas_cart', 'oc_status' ) ) {
			return;
		}
		?>
		<div class="cartick-wrap">
			<div class="cartick-oc-cart-wrap">
				<div class="cartick-oc-cart-inner">
					<button class="cartick-oc-cart-btn">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M10.278 2.333L6.055 6.568m11.667-4.235l4.223 4.235"/><path stroke="#fff" stroke-width="1.5" d="M2.333 9.158c0-2.158 1.155-2.333 2.59-2.333h18.154c1.435 0 2.59.175 2.59 2.333 0 2.509-1.155 2.334-2.59 2.334H4.923c-1.435 0-2.59.175-2.59-2.334z"/><path stroke="#fff" stroke-linecap="round" stroke-width="1.5" d="M11.387 16.333v4.142m5.366-4.142v4.142m-12.67-8.808l1.645 10.08c.374 2.263 1.272 3.92 4.609 3.92h7.035c3.628 0 4.165-1.587 4.585-3.78l1.96-10.22"/></svg>
						<span class="cartick-oc-cart-count"><?php echo esc_html( WC()->cart->get_cart_contents_count() ); ?></span>
					</button><!-- end .cartick-off-canvas-cart-btn -->
					<div class="cartick-oc-cart-content-wrap">
						<?php woocommerce_mini_cart(); ?>
					</div><!-- end .cartick-oc-cart-content-wrap -->
				</div>
			</div>
		</div>

		<?php
	}

	/**
	 * Cart count Fragment
	 *
	 * @return array
	 */
	public function cart_content_fragments(): array {

		ob_start();
		?>
		<div class="cartick-oc-cart-inner">
			<button class="cartick-oc-cart-btn">
				<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M10.278 2.333L6.055 6.568m11.667-4.235l4.223 4.235"/><path stroke="#fff" stroke-width="1.5" d="M2.333 9.158c0-2.158 1.155-2.333 2.59-2.333h18.154c1.435 0 2.59.175 2.59 2.333 0 2.509-1.155 2.334-2.59 2.334H4.923c-1.435 0-2.59.175-2.59-2.334z"/><path stroke="#fff" stroke-linecap="round" stroke-width="1.5" d="M11.387 16.333v4.142m5.366-4.142v4.142m-12.67-8.808l1.645 10.08c.374 2.263 1.272 3.92 4.609 3.92h7.035c3.628 0 4.165-1.587 4.585-3.78l1.96-10.22"/></svg>
				<span class="cartick-oc-cart-count"><?php echo esc_html( WC()->cart->get_cart_contents_count() ); ?></span>
			</button><!-- end .cartick-off-canvas-cart-btn -->
			<div class="cartick-oc-cart-content-wrap">
				<?php woocommerce_mini_cart(); ?>
			</div><!-- end .cartick-oc-cart-content-wrap -->
		</div>
		<script>
			( function( $, document ) {
				$('button.cartick-oc-cart-btn').on( 'click', function() {
					$(this).closest('.cartick-oc-cart-wrap').toggleClass('show');
				});
			} )( jQuery, document );
		</script>

		<?php $fragments['div.cartick-oc-cart-inner'] = ob_get_clean();

		return $fragments;
	}
}
