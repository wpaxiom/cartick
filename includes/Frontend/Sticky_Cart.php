<?php
/**
 * Cartick Sticky Cart
 *
 * @package cartick
 * @author WpAxiom <cartick@wpaxiom.com>
 * @version 1.0.0
 * @since 1.0.0
 */

namespace WpAxiom\Cartick\Frontend;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Initialize Sticky_Cart Class
 */
class Sticky_Cart {

	/**
	 * Sticky_Cart Class Constructor
	 */
	public function __construct() {
		add_action( 'woocommerce_after_single_product', array( $this, 'sticky_cart_callback' ) );
	}

	/**
	 * Sticky Cart Callback function
	 */
	public function sticky_cart_callback(): void {

		if ( is_product() ) {
			global $post, $product;

			if ( ! cartick_options( 'sticky_cart', 'sc_status' ) ) {
				return;
			}

			if ( cartick_options( 'sticky_cart', 'sc_show_out_of_stock' ) && 'outofstock' === $product->get_stock_status() ) {
				return;
			}

			if ( 'simple' === $product->get_type() ) {
				if ( ! cartick_options( 'sticky_cart', 'sc_enable_on_simple' ) ) {
					return;
				}
			} elseif ( 'grouped' === $product->get_type() ) {
				if ( ! cartick_options( 'sticky_cart', 'sc_enable_on_grouped' ) ) {
					return;
				}
			} elseif ( 'variable' === $product->get_type() ) {
				if ( ! cartick_options( 'sticky_cart', 'sc_enable_on_variable' ) ) {
					return;
				}
			} elseif ( 'external' === $product->get_type() ) {
				if ( ! cartick_options( 'sticky_cart', 'sc_enable_on_external' ) ) {
					return;
				}
			}

			$classes   = array();
			$classes[] = cartick_options( 'sticky_cart', 'sc_position' );
			$classes[] = cartick_options( 'sticky_cart', 'sc_show_on_scroll' ) ? 'show_on_scroll' : '';
			$classes[] = cartick_options( 'sticky_cart', 'sc_show_on_desktop' ) ? '' : 'hide_desktop';
			$classes[] = cartick_options( 'sticky_cart', 'sc_show_on_mobile' ) ? '' : 'hide_mobile';
			$classes   = apply_filters( 'cartick_sc_classes', $classes );
			$classes   = array_unique( array_filter( $classes ) );
			$classes   = implode( ' ', $classes );

			?>
			<div id="cartick-sticky-cart product-<?php the_ID(); ?>" class="cartick-sticky-cart__wrap <?php echo esc_attr( $classes ); ?>">
				<?php
				$product      = wc_get_product( $post->ID );
				$product_img  = wp_get_attachment_url( $product->get_image_id() );
				?>
					<div class="cartick-sticky-cart__product">
						<?php if ( cartick_options( 'sticky_cart', 'sc_show_image' ) ) { ?>
							<div class="cartick-sticky-cart__thumb">
								<img src="<?php echo esc_url( $product_img ); ?>" alt="<?php echo esc_attr( $product->get_name() ); ?>">
							</div><!-- end .cartick-sticky-cart__thumb -->
						<?php } ?>
						<div class="cartick-sticky-cart__title">
							<div class="cartick-sticky-car__product-name"><?php echo esc_html( $product->get_name() ); ?></div>
							<div class="cartick-sticky-cart__product-description"><?php echo esc_html( wp_trim_words( $product->get_short_description(), 5, ' ...' ) ); ?></div>
						</div><!-- end .cartick-sticky-cart__product -->
					</div><!-- end .cartick-sticky-cart__product -->

					<div class="cartick-sticky-cart__price">
						<?php
						if ( cartick_options( 'sticky_cart', 'sc_show_price' ) ) {
							echo wp_kses_post( $product->get_price_html() );
						}
						?>
					</div><!-- end .cartick-sticky-cart-price -->

					<div class="cartick-sticky-cart__form">
						<?php
							if ( 'simple' === $product->get_type() ) {
								woocommerce_simple_add_to_cart();
							} elseif ( 'grouped' === $product->get_type() ) {
								woocommerce_grouped_add_to_cart();
							} elseif ( 'variable' === $product->get_type() ) {
								woocommerce_variable_add_to_cart();
							} elseif ( 'external' === $product->get_type() ) {
								woocommerce_external_add_to_cart();
							}
						?>
					</div><!-- end .cartick-sticky-cart-product-meta -->
				</div><!-- end .cartick-wrapper -->
			<?php
		}
	}
}

// End of file Admin.php.
