<?php
/**
 * Off-Canvas Cart module: slide-out cart drawer triggered by a fixed button.
 *
 * The drawer renders its own markup (header / items / footer / empty state)
 * — we do not call woocommerce_mini_cart(). Customizing the markup ourselves
 * gives full control over layout and styling.
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
		return __( 'Slide-in cart drawer with a custom mini-cart, opened by a floating button.', 'cartick' );
	}

	public function settings_schema(): array {
		return array(
			'position'         => array( 'type' => 'enum',   'options' => array( 'left', 'right' ),                                       'default' => 'right' ),
			'width'            => array( 'type' => 'int',    'default' => 380, 'min' => 280, 'max' => 600 ),
			'title'            => array( 'type' => 'string', 'default' => 'Your Cart' ),
			'btn_position'     => array( 'type' => 'enum',   'options' => array( 'top-left', 'top-right', 'bottom-left', 'bottom-right' ), 'default' => 'bottom-right' ),
			'btn_bg'           => array( 'type' => 'string', 'default' => '#6B66F7' ),
			'btn_color'        => array( 'type' => 'string', 'default' => '#FFFFFF' ),
			'auto_open'        => array( 'type' => 'bool',   'default' => false ),
			'anim_speed'       => array( 'type' => 'enum',   'options' => array( 'slow', 'normal', 'fast' ),                              'default' => 'normal' ),
			'show_count_in_header' => array( 'type' => 'bool', 'default' => true ),
			'show_images'      => array( 'type' => 'bool',   'default' => true ),
			'empty_text'       => array( 'type' => 'string', 'default' => 'Your cart is empty.' ),
			'continue_url'     => array( 'type' => 'string', 'default' => '' ),
		);
	}

	public function register(): void {
		add_action( 'wp_footer', array( $this, 'render' ) );
		add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'cart_content_fragments' ) );
	}

	public function render(): void {
		$position     = (string) $this->get_setting( 'position' );
		if ( ! in_array( $position, array( 'left', 'right' ), true ) ) {
			$position = 'right';
		}

		$width        = max( 280, min( 600, (int) $this->get_setting( 'width' ) ) );
		$btn_position = (string) $this->get_setting( 'btn_position' );
		$btn_allowed  = array( 'top-left', 'top-right', 'bottom-left', 'bottom-right' );
		if ( ! in_array( $btn_position, $btn_allowed, true ) ) {
			$btn_position = 'bottom-right';
		}

		$btn_bg    = $this->sanitize_color( $this->get_setting( 'btn_bg' ), '#6B66F7' );
		$btn_color = $this->sanitize_color( $this->get_setting( 'btn_color' ), '#FFFFFF' );

		$anim_speed   = (string) $this->get_setting( 'anim_speed' );
		$anim_seconds = array( 'slow' => '0.6s', 'normal' => '0.4s', 'fast' => '0.22s' );
		$anim_value   = $anim_seconds[ $anim_speed ] ?? $anim_seconds['normal'];

		$style = sprintf(
			'--cartick-oc-width: %dpx; --cartick-oc-btn-bg: %s; --cartick-oc-btn-color: %s; --cartick-oc-anim: %s;',
			$width,
			$btn_bg,
			$btn_color,
			$anim_value
		);
		?>
		<div class="cartick-wrap" style="<?php echo esc_attr( $style ); ?>">
			<div class="cartick-oc-cart-wrap cartick-oc-position-<?php echo esc_attr( $position ); ?> cartick-oc-btn-<?php echo esc_attr( $btn_position ); ?>">
				<?php $this->render_inner(); ?>
			</div>
		</div>
		<?php
	}

	private function sanitize_color( $value, string $fallback ): string {
		$value = is_string( $value ) ? trim( $value ) : '';
		return preg_match( '/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/', $value ) ? $value : $fallback;
	}

	public function cart_content_fragments( $fragments ) {
		ob_start();
		$this->render_inner();
		$fragments['div.cartick-oc-cart-inner'] = ob_get_clean();
		return $fragments;
	}

	private function render_inner(): void {
		$cart  = WC()->cart;
		$count = $cart ? $cart->get_cart_contents_count() : 0;
		?>
		<div class="cartick-oc-cart-inner">

			<button class="cartick-oc-cart-btn" type="button" aria-label="<?php esc_attr_e( 'Open cart', 'cartick' ); ?>">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M6 6h15l-1.5 9h-12z"/>
					<path d="M6 6L5 3H2"/>
					<circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none"/>
					<circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none"/>
				</svg>
				<span class="cartick-oc-cart-count<?php echo $count > 0 ? '' : ' is-empty'; ?>"><?php echo esc_html( (string) $count ); ?></span>
			</button>

			<div class="cartick-oc-cart-content-wrap">
				<?php $this->render_header( $count ); ?>
				<?php if ( $cart && $count > 0 ) : ?>
					<?php $this->render_items( $cart ); ?>
					<?php $this->render_footer( $cart ); ?>
				<?php else : ?>
					<?php $this->render_empty(); ?>
				<?php endif; ?>
			</div>

		</div>
		<?php
	}

	private function render_header( int $count ): void {
		$title       = trim( (string) $this->get_setting( 'title' ) );
		$show_count  = (bool) $this->get_setting( 'show_count_in_header' );
		?>
		<div class="cartick-oc-cart-heading-wrap">
			<h2><?php echo esc_html( '' !== $title ? $title : __( 'Your Cart', 'cartick' ) ); ?></h2>
			<?php if ( $show_count && $count > 0 ) : ?>
				<span class="cartick-oc-cart-header-count">
					<?php
					/* translators: %d: number of items in cart */
					printf( esc_html( _n( '%d item', '%d items', $count, 'cartick' ) ), (int) $count );
					?>
				</span>
			<?php endif; ?>
			<button type="button" class="cartick-oc-cart-close" aria-label="<?php esc_attr_e( 'Close cart', 'cartick' ); ?>">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M6 6l12 12M18 6L6 18"/>
				</svg>
			</button>
		</div>
		<?php
	}

	private function render_items( \WC_Cart $cart ): void {
		$show_images = (bool) $this->get_setting( 'show_images' );
		?>
		<ul class="cartick-oc-cart-items">
			<?php
			foreach ( $cart->get_cart() as $cart_item_key => $cart_item ) :
				$product = $cart_item['data'];
				if ( ! $product || ! $product->exists() || $cart_item['quantity'] <= 0 ) {
					continue;
				}
				if ( ! apply_filters( 'woocommerce_widget_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
					continue;
				}
				$product_name      = apply_filters( 'woocommerce_cart_item_name', $product->get_name(), $cart_item, $cart_item_key );
				$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $product->is_visible() ? $product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
				$product_price     = apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $product ), $cart_item, $cart_item_key );
				$remove_url        = wc_get_cart_remove_url( $cart_item_key );
				?>
				<li class="cartick-oc-cart-item" data-cart_item_key="<?php echo esc_attr( $cart_item_key ); ?>">
					<?php if ( $show_images ) : ?>
						<div class="cartick-oc-cart-item__thumb">
							<?php
							$thumbnail = apply_filters( 'woocommerce_cart_item_thumbnail', $product->get_image(), $cart_item, $cart_item_key );
							echo wp_kses_post( $thumbnail );
							?>
						</div>
					<?php endif; ?>

					<div class="cartick-oc-cart-item__body">
						<?php if ( $product_permalink ) : ?>
							<a class="cartick-oc-cart-item__name" href="<?php echo esc_url( $product_permalink ); ?>"><?php echo wp_kses_post( $product_name ); ?></a>
						<?php else : ?>
							<span class="cartick-oc-cart-item__name"><?php echo wp_kses_post( $product_name ); ?></span>
						<?php endif; ?>

						<?php
						// Variation / item meta.
						$item_data = wc_get_formatted_cart_item_data( $cart_item );
						if ( $item_data ) {
							echo '<div class="cartick-oc-cart-item__meta">' . wp_kses_post( $item_data ) . '</div>';
						}
						?>

						<div class="cartick-oc-cart-item__price"><?php echo wp_kses_post( $product_price ); ?></div>

						<div class="cartick-oc-cart-item__qty">
							<button type="button" class="cartick-oc-qty-minus" aria-label="<?php esc_attr_e( 'Decrease quantity', 'cartick' ); ?>">−</button>
							<input
								type="number"
								class="cartick-oc-qty-input"
								value="<?php echo esc_attr( $cart_item['quantity'] ); ?>"
								min="0"
								step="1"
								data-cart_item_key="<?php echo esc_attr( $cart_item_key ); ?>"
								aria-label="<?php esc_attr_e( 'Quantity', 'cartick' ); ?>"
							/>
							<button type="button" class="cartick-oc-qty-plus" aria-label="<?php esc_attr_e( 'Increase quantity', 'cartick' ); ?>">+</button>
						</div>
					</div>

					<a
						class="cartick-oc-cart-item__remove"
						href="<?php echo esc_url( $remove_url ); ?>"
						aria-label="<?php
							/* translators: %s: product name */
							echo esc_attr( sprintf( __( 'Remove %s from cart', 'cartick' ), wp_strip_all_tags( $product_name ) ) );
						?>"
						data-cart_item_key="<?php echo esc_attr( $cart_item_key ); ?>"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
						</svg>
					</a>
				</li>
			<?php endforeach; ?>
		</ul>
		<?php
	}

	private function render_footer( \WC_Cart $cart ): void {
		?>
		<div class="cartick-oc-cart-footer">
			<div class="cartick-oc-cart-subtotal">
				<span class="cartick-oc-cart-subtotal__label"><?php esc_html_e( 'Subtotal', 'cartick' ); ?></span>
				<span class="cartick-oc-cart-subtotal__value"><?php echo wp_kses_post( wc_price( $cart->get_subtotal() ) ); ?></span>
			</div>
			<div class="cartick-oc-cart-actions">
				<a class="cartick-oc-cart-view" href="<?php echo esc_url( wc_get_cart_url() ); ?>"><?php esc_html_e( 'View Cart', 'cartick' ); ?></a>
				<a class="cartick-oc-cart-checkout" href="<?php echo esc_url( wc_get_checkout_url() ); ?>"><?php esc_html_e( 'Checkout', 'cartick' ); ?></a>
			</div>
		</div>
		<?php
	}

	private function render_empty(): void {
		$msg          = trim( (string) $this->get_setting( 'empty_text' ) );
		$continue_url = trim( (string) $this->get_setting( 'continue_url' ) );
		if ( '' === $continue_url ) {
			$continue_url = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/' );
		}
		?>
		<div class="cartick-oc-cart-empty">
			<span class="cartick-oc-cart-empty__icon" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
					<path d="M6 6h15l-1.5 9h-12z"/>
					<path d="M6 6L5 3H2"/>
					<circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none"/>
					<circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none"/>
				</svg>
			</span>
			<p class="cartick-oc-cart-empty__text"><?php echo esc_html( '' !== $msg ? $msg : __( 'Your cart is empty.', 'cartick' ) ); ?></p>
			<a class="cartick-oc-cart-empty__cta" href="<?php echo esc_url( $continue_url ); ?>"><?php esc_html_e( 'Continue shopping', 'cartick' ); ?></a>
		</div>
		<?php
	}
}
