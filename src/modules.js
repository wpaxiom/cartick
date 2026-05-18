/**
 * Module registry for the dashboard.
 *
 * Each module maps to:
 *   - id: route id, also matches the tab id used by existing Tabs/* files
 *   - name / description: shown on the card and feature page header
 *   - statusPath: dotted path into cartick_options that drives the
 *     enabled toggle. cart_btn doesn't have a dedicated on/off in the
 *     legacy schema, so we reuse `cart_btn_style` (its "enable custom
 *     styling" flag) as the closest equivalent.
 */

const MODULES = [
    {
        id: 'add-to-cart',
        name: 'Add to Cart Button',
        description:
            'Customise the add-to-cart button label and styling across shop, single product, and quick view.',
        settingsKey: 'cart_btn',
        statusPath: [ 'cart_btn', 'cart_btn_style' ],
    },
    {
        id: 'sticky-cart',
        name: 'Sticky Cart',
        description:
            'Floating add-to-cart panel that follows the shopper on single product pages.',
        settingsKey: 'sticky_cart',
        statusPath: [ 'sticky_cart', 'sc_status' ],
    },
    {
        id: 'menu-cart',
        name: 'Menu Cart',
        description:
            'Cart summary widget (icon, count, total) injected into any WordPress nav menu.',
        settingsKey: 'menu_cart',
        statusPath: [ 'menu_cart', 'mc_status' ],
    },
    {
        id: 'off-canvas-cart',
        name: 'Off-Canvas Cart',
        description:
            'Slide-in drawer cart from the left or right with the WooCommerce mini-cart.',
        settingsKey: 'off_canvas_cart',
        statusPath: [ 'off_canvas_cart', 'oc_status' ],
    },
];

export const isModuleEnabled = ( settings, mod ) => {
    if ( ! settings ) {
        return false;
    }
    const [ group, field ] = mod.statusPath;
    return Boolean( settings?.[ group ]?.[ field ] );
};

export default MODULES;
