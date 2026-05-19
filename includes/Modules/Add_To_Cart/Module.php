<?php
/**
 * Add-to-Cart module: customize button text per product type and inject
 * inline CSS to style the cart button.
 *
 * @package cartick
 */

namespace WpAxiom\Cartick\Modules\Add_To_Cart;

use WpAxiom\Cartick\Core\Module as Core_Module;

if ( ! defined( 'ABSPATH' ) ) exit;

class Module extends Core_Module {

	public static function id(): string {
		return 'add_to_cart';
	}

	public static function name(): string {
		return __( 'Add to Cart Button', 'cartick' );
	}

	public static function description(): string {
		return __( 'Customize the add-to-cart button label per product type and style it with padding and colors.', 'cartick' );
	}

	public function settings_schema(): array {
		return array(
			// Module-level enable flag. Mirrored to cartick_modules by the
			// Migrator so Module_Registry::boot() actually gates this module.
			'status'               => array( 'type' => 'bool',   'default' => true ),
			'simple_text'          => array( 'type' => 'string', 'default' => 'Add to cart' ),
			'variable_text'        => array( 'type' => 'string', 'default' => 'Select Options' ),
			'grouped_text'         => array( 'type' => 'string', 'default' => 'Select Options' ),
			'external_text'        => array( 'type' => 'string', 'default' => 'Buy Now' ),
			'single_simple_text'   => array( 'type' => 'string', 'default' => 'Add to cart' ),
			'single_variable_text' => array( 'type' => 'string', 'default' => 'Add to cart' ),
			'single_grouped_text'  => array( 'type' => 'string', 'default' => 'Add to cart' ),
			'single_external_text' => array( 'type' => 'string', 'default' => 'Buy Now' ),
			'enable_custom_style'  => array( 'type' => 'bool', 'default' => false ),
			'padding_top'          => array( 'type' => 'int', 'min' => 0, 'max' => 200, 'default' => 15 ),
			'padding_right'        => array( 'type' => 'int', 'min' => 0, 'max' => 200, 'default' => 15 ),
			'padding_bottom'       => array( 'type' => 'int', 'min' => 0, 'max' => 200, 'default' => 15 ),
			'padding_left'         => array( 'type' => 'int', 'min' => 0, 'max' => 200, 'default' => 15 ),
			'color'                => array( 'type' => 'color', 'default' => '#ffffff' ),
			'background'           => array( 'type' => 'color', 'default' => '#000000' ),
		);
	}

	public function register(): void {
		add_filter( 'woocommerce_product_single_add_to_cart_text', array( $this, 'filter_single_text' ), 10, 2 );
		add_filter( 'woocommerce_product_add_to_cart_text', array( $this, 'filter_archive_text' ), 10, 2 );
		add_filter( 'body_class', array( $this, 'body_class' ) );
		add_action( 'wp_head', array( $this, 'render_styles' ) );
	}

	public function filter_single_text( $text, $product ): string {
		if ( ! $product ) {
			return (string) $text;
		}
		$map = array(
			'simple'   => 'single_simple_text',
			'variable' => 'single_variable_text',
			'grouped'  => 'single_grouped_text',
			'external' => 'single_external_text',
		);
		$key = $map[ $product->get_type() ] ?? null;
		return $key ? (string) $this->get_setting( $key ) : (string) $text;
	}

	public function filter_archive_text( $text, $product ): string {
		if ( ! $product ) {
			return (string) $text;
		}
		$map = array(
			'simple'   => 'simple_text',
			'variable' => 'variable_text',
			'grouped'  => 'grouped_text',
			'external' => 'external_text',
		);
		$key = $map[ $product->get_type() ] ?? null;
		$text = $key ? (string) $this->get_setting( $key ) : (string) $text;
		return apply_filters( 'cartick_archive_add_to_cart_text', $text, $product );
	}

	public function body_class( $classes ): array {
		// Add the class globally when custom styling is on. The selectors in
		// render_styles() only match WooCommerce add-to-cart buttons, so this
		// has zero effect on non-WC pages but DOES catch product grids on the
		// homepage, category pages, blocks-based widgets, etc.
		if ( class_exists( 'WooCommerce' ) && $this->get_setting( 'enable_custom_style' ) ) {
			$classes[] = 'cartick-cart-btn';
		}
		return $classes;
	}

	public function render_styles(): void {
		if ( ! $this->get_setting( 'enable_custom_style' ) ) {
			return;
		}

		// All values pass through the schema validator on save (int / color),
		// so they're safe to interpolate into CSS. esc_attr is a belt-and-
		// braces final escape.
		$top    = (int) $this->get_setting( 'padding_top' );
		$right  = (int) $this->get_setting( 'padding_right' );
		$bottom = (int) $this->get_setting( 'padding_bottom' );
		$left   = (int) $this->get_setting( 'padding_left' );
		$color  = (string) $this->get_setting( 'color' );
		$bg     = (string) $this->get_setting( 'background' );

		/*
		 * The base selector targets the two WooCommerce button classes
		 * directly (.add_to_cart_button on loops, .single_add_to_cart_button
		 * on single product pages). Each property uses !important so we win
		 * against typical theme rules without having to chase every theme's
		 * specificity stack. Themes that need to override can still raise
		 * specificity or use their own !important.
		 */
		?>
		<style class="cartick-cart-btn-styles">
			body.cartick-cart-btn .add_to_cart_button,
			body.cartick-cart-btn .single_add_to_cart_button,
			body.cartick-cart-btn a.button.add_to_cart_button,
			body.cartick-cart-btn button.single_add_to_cart_button,
			body.cartick-cart-btn .woocommerce a.button.add_to_cart_button,
			body.cartick-cart-btn .woocommerce button.single_add_to_cart_button,
			body.cartick-cart-btn .wc-block-components-product-button .wp-block-button__link {
				padding-top: <?php echo esc_attr( $top ); ?>px !important;
				padding-right: <?php echo esc_attr( $right ); ?>px !important;
				padding-bottom: <?php echo esc_attr( $bottom ); ?>px !important;
				padding-left: <?php echo esc_attr( $left ); ?>px !important;
				color: <?php echo esc_attr( $color ); ?> !important;
				background-color: <?php echo esc_attr( $bg ); ?> !important;
				border-color: <?php echo esc_attr( $bg ); ?> !important;
				transition: filter 160ms ease, transform 160ms ease, box-shadow 160ms ease !important;
				cursor: pointer;
			}
			body.cartick-cart-btn .add_to_cart_button:hover,
			body.cartick-cart-btn .single_add_to_cart_button:hover,
			body.cartick-cart-btn a.button.add_to_cart_button:hover,
			body.cartick-cart-btn button.single_add_to_cart_button:hover,
			body.cartick-cart-btn .woocommerce a.button.add_to_cart_button:hover,
			body.cartick-cart-btn .woocommerce button.single_add_to_cart_button:hover,
			body.cartick-cart-btn .wc-block-components-product-button .wp-block-button__link:hover {
				color: <?php echo esc_attr( $color ); ?> !important;
				background-color: <?php echo esc_attr( $bg ); ?> !important;
				border-color: <?php echo esc_attr( $bg ); ?> !important;
				filter: brightness(0.92);
				transform: translateY(-1px);
			}
			body.cartick-cart-btn .add_to_cart_button:active,
			body.cartick-cart-btn .single_add_to_cart_button:active,
			body.cartick-cart-btn a.button.add_to_cart_button:active,
			body.cartick-cart-btn button.single_add_to_cart_button:active,
			body.cartick-cart-btn .woocommerce a.button.add_to_cart_button:active,
			body.cartick-cart-btn .woocommerce button.single_add_to_cart_button:active,
			body.cartick-cart-btn .wc-block-components-product-button .wp-block-button__link:active {
				filter: brightness(0.85);
				transform: translateY(0);
			}
		</style>
		<?php
	}
}
