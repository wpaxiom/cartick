<?php
/**
 * Off-Canvas Cart module: slide-out cart drawer triggered by a fixed button.
 *
 * @package cartick
 */

namespace WpAxiom\Cartick\Modules\Off_Canvas_Cart;

use WpAxiom\Cartick\Core\Module as Core_Module;

if ( ! defined( 'ABSPATH' ) ) exit;

class Module extends Core_Module {

	public static function id(): string {
		return 'off_canvas_cart';
	}

	public static function name(): string {
		return __( 'Off-Canvas Cart', 'cartick' );
	}

	public static function description(): string {
		return __( 'Slide-in cart drawer with the WooCommerce mini-cart, opened by a floating button.', 'cartick' );
	}

	public function settings_schema(): array {
		return array(
			'position' => array( 'type' => 'enum', 'options' => array( 'left', 'right' ), 'default' => 'right' ),
		);
	}

	public function register(): void {
		add_action( 'wp_footer', array( $this, 'render' ) );
		add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'cart_content_fragments' ) );
	}

	public function render(): void {
		$position = (string) $this->get_setting( 'position' );
		?>
		<div class="cartick-wrap">
			<div class="cartick-oc-cart-wrap cartick-oc-position-<?php echo esc_attr( $position ); ?>">
				<?php $this->render_inner(); ?>
			</div>
		</div>
		<?php
	}

	public function cart_content_fragments( $fragments ) {
		ob_start();
		$this->render_inner();
		$fragments['div.cartick-oc-cart-inner'] = ob_get_clean();
		return $fragments;
	}

	private function render_inner(): void {
		$count = WC()->cart ? WC()->cart->get_cart_contents_count() : 0;
		?>
		<div class="cartick-oc-cart-inner">
			<button class="cartick-oc-cart-btn" type="button" aria-label="<?php esc_attr_e( 'Open cart', 'cartick' ); ?>">
				<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M10.278 2.333L6.055 6.568m11.667-4.235l4.223 4.235"/><path stroke="#fff" stroke-width="1.5" d="M2.333 9.158c0-2.158 1.155-2.333 2.59-2.333h18.154c1.435 0 2.59.175 2.59 2.333 0 2.509-1.155 2.334-2.59 2.334H4.923c-1.435 0-2.59.175-2.59-2.334z"/><path stroke="#fff" stroke-linecap="round" stroke-width="1.5" d="M11.387 16.333v4.142m5.366-4.142v4.142m-12.67-8.808l1.645 10.08c.374 2.263 1.272 3.92 4.609 3.92h7.035c3.628 0 4.165-1.587 4.585-3.78l1.96-10.22"/></svg>
				<span class="cartick-oc-cart-count"><?php echo esc_html( (string) $count ); ?></span>
			</button>
			<div class="cartick-oc-cart-content-wrap">
				<?php woocommerce_mini_cart(); ?>
			</div>
		</div>
		<?php
	}
}
