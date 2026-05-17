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
		add_action( 'woocommerce_after_single_product', array( $this, 'render' ) );
	}

	public function render(): void {
		if ( ! is_product() ) {
			return;
		}

		global $post, $product;

		if ( ! ( $product instanceof \WC_Product ) ) {
			return;
		}

		if ( $this->get_setting( 'hide_when_out_of_stock' ) && 'outofstock' === $product->get_stock_status() ) {
			return;
		}

		if ( ! $this->is_enabled_for_type( $product->get_type() ) ) {
			return;
		}

		$classes = array_filter( array(
			$this->get_setting( 'position' ),
			$this->get_setting( 'show_on_scroll' ) ? 'show_on_scroll' : '',
			$this->get_setting( 'show_on_desktop' ) ? '' : 'hide_desktop',
			$this->get_setting( 'show_on_mobile' ) ? '' : 'hide_mobile',
		) );

		$classes = apply_filters( 'cartick_sc_classes', $classes );
		$classes = implode( ' ', array_unique( array_filter( $classes ) ) );

		$product     = wc_get_product( $post->ID );
		$product_img = wp_get_attachment_url( $product->get_image_id() );
		?>
		<div id="cartick-sticky-cart product-<?php the_ID(); ?>" class="cartick-sticky-cart__wrap <?php echo esc_attr( $classes ); ?>">
			<div class="cartick-sticky-cart__product">
				<?php if ( $this->get_setting( 'show_image' ) ) : ?>
					<div class="cartick-sticky-cart__thumb">
						<img src="<?php echo esc_url( $product_img ); ?>" alt="<?php echo esc_attr( $product->get_name() ); ?>">
					</div>
				<?php endif; ?>
				<div class="cartick-sticky-cart__title">
					<div class="cartick-sticky-car__product-name"><?php echo esc_html( $product->get_name() ); ?></div>
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
