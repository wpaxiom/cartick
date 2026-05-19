<?php
/**
 * Sticky Cart module: floating add-to-cart panel on single product pages.
 *
 * @package cartick
 */

namespace WpAxiom\Cartick\Modules\Sticky_Cart;

use WpAxiom\Cartick\Core\Module as Core_Module;

if ( ! defined( 'ABSPATH' ) ) exit;

class Module extends Core_Module {

	public static function id(): string {
		return 'sticky_cart';
	}

	public static function name(): string {
		return __( 'Sticky Cart', 'cartick' );
	}

	public static function description(): string {
		return __( 'Floating add-to-cart panel that follows the user on single product pages.', 'cartick' );
	}

	public function settings_schema(): array {
		return array(
			'position'              => array( 'type' => 'enum', 'options' => array( 'top', 'bottom' ), 'default' => 'bottom' ),
			'show_on_desktop'       => array( 'type' => 'bool', 'default' => true ),
			'show_on_mobile'        => array( 'type' => 'bool', 'default' => true ),
			'ajax_cart'             => array( 'type' => 'bool', 'default' => true ),
			'show_on_scroll'        => array( 'type' => 'bool', 'default' => false ),
			'scroll_offset'         => array( 'type' => 'int', 'min' => 0, 'max' => 10000, 'default' => 500 ),
			'show_image'            => array( 'type' => 'bool', 'default' => true ),
			'show_price'            => array( 'type' => 'bool', 'default' => true ),
			'hide_when_out_of_stock' => array( 'type' => 'bool', 'default' => true ),
			'enable_on_simple'      => array( 'type' => 'bool', 'default' => true ),
			'enable_on_grouped'     => array( 'type' => 'bool', 'default' => true ),
			'enable_on_variable'    => array( 'type' => 'bool', 'default' => true ),
			'enable_on_external'    => array( 'type' => 'bool', 'default' => true ),
		);
	}

	public function register(): void {
		// wp_footer is universal — fires on every page regardless of theme.
		// woocommerce_after_single_product is theme-emitted and can be missing
		// in block themes or heavily-customised templates.
		add_action( 'wp_footer', array( $this, 'render' ) );
	}

	public function render(): void {
		if ( ! is_product() ) {
			return;
		}

		$product = wc_get_product( get_queried_object_id() );

		if ( ! ( $product instanceof \WC_Product ) ) {
			return;
		}

		if ( $this->get_setting( 'hide_when_out_of_stock' ) && 'outofstock' === $product->get_stock_status() ) {
			return;
		}

		if ( ! $this->is_enabled_for_type( $product->get_type() ) ) {
			return;
		}

		// Always emit a position class (top/bottom) — falling back to
		// 'bottom' if the stored value is somehow unrecognised. Without
		// this the SCSS leaves the bar with `position: fixed` but no
		// top/bottom anchor, so it sits at the document origin and is
		// effectively invisible behind other content.
		$position    = $this->get_setting( 'position' );
		$position    = in_array( $position, array( 'top', 'bottom' ), true ) ? $position : 'bottom';

		$classes = array_filter( array(
			$position,
			$this->get_setting( 'show_on_scroll' ) ? 'show_on_scroll' : '',
			$this->get_setting( 'show_on_desktop' ) ? '' : 'hide_desktop',
			$this->get_setting( 'show_on_mobile' ) ? '' : 'hide_mobile',
		) );

		$classes = apply_filters( 'cartick_sc_classes', $classes );
		$classes = implode( ' ', array_unique( array_filter( $classes ) ) );

		$product_id = $product->get_id();

		/*
		 * WC's add-to-cart templates rely on $GLOBALS['product'] and
		 * $GLOBALS['post']. In wp_footer (where we render to guarantee
		 * theme-independence) the main loop has already ended, so those
		 * globals may be null or stale — and that produces a form with
		 * `value=""` for the add-to-cart hidden input, which silently
		 * fails on submit. Set them ourselves for the duration of the
		 * render and restore so we don't pollute downstream code.
		 */
		$previous_product = $GLOBALS['product'] ?? null;
		$previous_post    = $GLOBALS['post']    ?? null;
		$GLOBALS['product'] = $product;
		$GLOBALS['post']    = get_post( $product_id );
		?>
		<div id="cartick-sticky-cart-<?php echo esc_attr( $product_id ); ?>" class="cartick-sticky-cart__wrap <?php echo esc_attr( $classes ); ?>">
			<div class="cartick-sticky-cart__product">
				<?php if ( $this->get_setting( 'show_image' ) ) : ?>
					<div class="cartick-sticky-cart__thumb">
						<?php echo $product->get_image( 'woocommerce_thumbnail' ); /* phpcs:ignore — WC returns a safe <img> tag with srcset. */ ?>
					</div>
				<?php endif; ?>
				<div class="cartick-sticky-cart__title">
					<div class="cartick-sticky-cart__product-name"><?php echo esc_html( $product->get_name() ); ?></div>
					<div class="cartick-sticky-cart__product-description"><?php echo esc_html( wp_trim_words( $product->get_short_description(), 5, ' ...' ) ); ?></div>
				</div>
			</div>

			<div class="cartick-sticky-cart__price">
				<?php if ( $this->get_setting( 'show_price' ) ) {
					echo wp_kses_post( $product->get_price_html() );
				} ?>
			</div>

			<div class="cartick-sticky-cart__form">
				<?php $this->render_add_to_cart_form( $product->get_type() ); ?>
			</div>
		</div>
		<?php
		// Restore prior globals.
		$GLOBALS['product'] = $previous_product;
		$GLOBALS['post']    = $previous_post;
	}

	private function is_enabled_for_type( string $type ): bool {
		$map = array(
			'simple'   => 'enable_on_simple',
			'grouped'  => 'enable_on_grouped',
			'variable' => 'enable_on_variable',
			'external' => 'enable_on_external',
		);
		if ( ! isset( $map[ $type ] ) ) {
			return false;
		}
		return (bool) $this->get_setting( $map[ $type ] );
	}

	private function render_add_to_cart_form( string $type ): void {
		switch ( $type ) {
			case 'simple':
				woocommerce_simple_add_to_cart();
				break;
			case 'grouped':
				woocommerce_grouped_add_to_cart();
				break;
			case 'variable':
				woocommerce_variable_add_to_cart();
				break;
			case 'external':
				woocommerce_external_add_to_cart();
				break;
		}
	}
}
