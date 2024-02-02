<?php
/**
 * Cartick Menu Cart
 *
 * @package cartick
 * @author WpAxiom <info@wpaxiom.com>
 * @version 1.0.0
 * @since 1.0.0
 */

namespace WpAxiom\Cartick\Frontend;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Initialize Menu_Cart Class
 */
class Menu_Cart {
	/**
	 * Menu_Cart Class Constructor
	 */
	public function __construct() {
		add_action( 'wp_head', array( $this, 'init_menu_cart' ) );
		add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'cart_content_fragments' ) );
	}

	public function init_menu_cart(): void {
		$menu_cart = cartick_options('menu_cart', 'mc_select_menu_cart');
		if ( $menu_cart && cartick_options( 'menu_cart', 'mc_status', true ) ) {
			if ( is_cart() ) {
				if ( cartick_options( 'menu_cart', 'mc_show_on_cart_page', true ) ) {
					add_filter( 'wp_nav_menu_' . $menu_cart . '_items', array( $this, 'menu_cart_init' ) );
				}
			} elseif ( is_checkout() ) {
				if ( cartick_options( 'menu_cart', 'mc_show_on_checkout_page', true ) ) {
					add_filter( 'wp_nav_menu_' . $menu_cart . '_items', array( $this, 'menu_cart_init' ) );
				}
			} else {
				add_filter( 'wp_nav_menu_' . $menu_cart . '_items', array( $this, 'menu_cart_init' ) );
			}
		}
	}

	/**
	 * Cart Button Classes
	 *
	 * @return string
	 */
	public function cartick_mc_classes(): string {
		$classes[] = cartick_options( 'menu_cart', 'mc_custom_css' );
		$classes   = apply_filters( 'cartick_mc_classes', $classes );
		$classes   = array_unique( array_filter( $classes ) );
		return implode( ' ', $classes );
	}

    public function menu_cart_content() {
        ?>
        <a class="cartick-mc-cart-btn" href="<?php echo esc_url( wc_get_cart_url() ) ?>">
		    <?php
		    $menu_cart = cartick_options( 'menu_cart', 'mc_menu_content' );

		    if ( cartick_options( 'menu_cart', 'mc_display_cart_icon' ) ) {
			    ?><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 8.62981C16.09 8.62981 15.75 8.28981 15.75 7.87981V6.49981C15.75 5.44981 15.3 4.42981 14.52 3.71981C13.73 2.99981 12.71 2.66981 11.63 2.76981C9.83 2.93981 8.25 4.77981 8.25 6.69981V7.66981C8.25 8.07981 7.91 8.41981 7.5 8.41981C7.09 8.41981 6.75 8.07981 6.75 7.66981V6.68981C6.75 3.99981 8.92 1.51981 11.49 1.26981C12.99 1.12981 14.43 1.59981 15.53 2.60981C16.62 3.59981 17.25 5.01981 17.25 6.49981V7.87981C17.25 8.28981 16.91 8.62981 16.5 8.62981Z" fill="black"/><path d="M15 22.75H9C4.38 22.75 3.52 20.6 3.3 18.51L2.55 12.52C2.44 11.44 2.4 9.89 3.45 8.73C4.35 7.73 5.84 7.25 8 7.25H16C18.17 7.25 19.66 7.74 20.55 8.73C21.59 9.89 21.56 11.44 21.45 12.5L20.7 18.51C20.48 20.6 19.62 22.75 15 22.75ZM8 8.75C6.31 8.75 5.15 9.08 4.56 9.74C4.07 10.28 3.91 11.11 4.04 12.35L4.79 18.34C4.96 19.94 5.4 21.26 9 21.26H15C18.6 21.26 19.04 19.95 19.21 18.36L19.96 12.35C20.09 11.13 19.93 10.3 19.44 9.75C18.85 9.08 17.69 8.75 16 8.75H8Z" fill="black"/><path d="M15.42 13.1499C14.86 13.1499 14.41 12.6999 14.41 12.1499C14.41 11.5999 14.86 11.1499 15.41 11.1499C15.96 11.1499 16.41 11.5999 16.41 12.1499C16.41 12.6999 15.97 13.1499 15.42 13.1499Z" fill="black"/><path d="M8.41997 13.1499C7.85997 13.1499 7.40997 12.6999 7.40997 12.1499C7.40997 11.5999 7.85997 11.1499 8.40997 11.1499C8.95997 11.1499 9.40997 11.5999 9.40997 12.1499C9.40997 12.6999 8.96997 13.1499 8.41997 13.1499Z" fill="black"/></svg><?php
		    }

		    if ( 'item-price' === $menu_cart ) {
			    /* translators: %d: Cart Item Number */
			    echo sprintf ( '<span class="cartick-mc-cart-count">%d items</span> <span class="cartick-mc-cart-total">- %s</span>', esc_html( WC()->cart->get_cart_contents_count() ), wp_kses_post( wc_price( WC()->cart->get_cart_contents_total() ) ) ); //phpcs:ignore
		    } elseif ( 'price' === $menu_cart ) {
			    /* translators: %d: Cart Price */
			    echo sprintf ( '<span class="cartick-mc-cart-total">%s</span>', wp_kses_post( wc_price( WC()->cart->get_cart_contents_total() ) ) ); //phpcs:ignore
		    } else {
			    /* translators: %d: Cart Item Number */
			    echo sprintf ( '<span class="cartick-mc-cart-count">%d items</span>', esc_html( WC()->cart->get_cart_contents_count() ) ); //phpcs:ignore
		    }
		    ?>
        </a><!-- end .cartick-off-canvas-cart-btn -->
        <?php
    }

	public function menu_cart_init(): void {

        if ( ! cartick_options( 'menu_cart', 'mc_display_cart' ) ) {
            return;
        }

		?>
		<div class="cartick-wrap">
			<div class="cartick-mc-cart-wrap <?php echo esc_attr( $this->cartick_mc_classes() ); ?>">
				<div class="cartick-mc-cart-inner cartick-align-<?php echo cartick_options( 'menu_cart', 'mc_menu_align' ); ?>">
					<?php $this->menu_cart_content(); ?>
				</div>
			</div>
		</div>
		<?php
	}

    public function cart_content_fragments() {
        ob_start();
        ?>
	    <div class="cartick-mc-cart-inner cartick-align-<?php echo cartick_options( 'menu_cart', 'mc_menu_align' ); ?>">
	    <?php
        $this->menu_cart_content();
        echo "</div>";

	    $fragments['div.cartick-mc-cart-inner'] = ob_get_clean();

	    return $fragments;
    }
}
