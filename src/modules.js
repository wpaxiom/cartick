/**
 * Module registry for the dashboard.
 *
 * Each module maps to:
 *   - id: route id (also the WP submenu slug suffix — see Admin_Menu.php)
 *   - name / description: shown on the card and feature page header
 *   - statusPath: dotted path into cartick_options that drives the
 *     enabled toggle. cart_btn doesn't have a dedicated on/off in the
 *     legacy schema, so we reuse `cart_btn_style` (its "enable custom
 *     styling" flag) as the closest equivalent.
 *   - Icon: single-color, 20×20 line SVG component for the card.
 */

import React from 'react';

const AddToCartIcon = ( props ) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" { ...props }>
        <path d="M4 6h2l1.7 9.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.4L21 9H7" />
        <circle cx="9" cy="20" r="1.2" />
        <circle cx="17" cy="20" r="1.2" />
        <path d="M14 8V4M12 6h4" />
    </svg>
);

const StickyCartIcon = ( props ) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" { ...props }>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <rect x="5" y="14" width="14" height="4" rx="1" />
        <circle cx="15.5" cy="16" r="0.6" fill="currentColor" />
    </svg>
);

const MenuCartIcon = ( props ) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" { ...props }>
        <path d="M3 6h11M3 12h11M3 18h7" />
        <circle cx="19" cy="6.5" r="3" />
        <path d="M16.5 5.5l1 1 2-2" />
    </svg>
);

const OffCanvasIcon = ( props ) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" { ...props }>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M14 4v16" />
        <path d="M16.5 9h2.5M16.5 12h2.5M16.5 15h2.5" />
    </svg>
);

const MODULES = [
    {
        id: 'add-to-cart',
        name: 'Add to Cart Button',
        description:
            'Customise the add-to-cart button label and styling across shop, single product, and quick view.',
        settingsKey: 'cart_btn',
        statusPath: [ 'cart_btn', 'status' ],
        Icon: AddToCartIcon,
    },
    {
        id: 'sticky-cart',
        name: 'Sticky Cart',
        description:
            'Floating add-to-cart panel that follows the shopper on single product pages.',
        settingsKey: 'sticky_cart',
        statusPath: [ 'sticky_cart', 'sc_status' ],
        Icon: StickyCartIcon,
    },
    {
        id: 'menu-cart',
        name: 'Menu Cart',
        description:
            'Cart summary widget (icon, count, total) injected into any WordPress nav menu.',
        settingsKey: 'menu_cart',
        statusPath: [ 'menu_cart', 'mc_status' ],
        Icon: MenuCartIcon,
    },
    {
        id: 'off-canvas-cart',
        name: 'Off-Canvas Cart',
        description:
            'Slide-in drawer cart from the left or right with the WooCommerce mini-cart.',
        settingsKey: 'off_canvas_cart',
        statusPath: [ 'off_canvas_cart', 'oc_status' ],
        Icon: OffCanvasIcon,
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
