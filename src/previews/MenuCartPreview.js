import React from 'react';

const CartGlyph = ( props ) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" { ...props }>
        <circle cx="9" cy="20" r="1.2" />
        <circle cx="17" cy="20" r="1.2" />
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H6" />
    </svg>
);

const MenuCartPreview = ( { values } ) => {
    const v = values || {};
    const showIcon = v.mc_display_cart_icon !== false;
    const content  = v.mc_menu_content || 'item';   // item | price | item-price
    const align    = v.mc_menu_align    || 'default';

    const showCount = content === 'item' || content === 'item-price';
    const showPrice = content === 'price' || content === 'item-price';

    const navJustify = align === 'left' ? 'flex-start' : ( align === 'right' ? 'flex-end' : 'center' );

    return (
        <div className="cartick-preview-frame cartick-preview-frame--menu">
            <div className="cartick-preview-menu">
                <span className="cartick-preview-menu__brand">Atelier</span>
                <nav className="cartick-preview-menu__nav" style={ { justifyContent: navJustify } }>
                    <span>Shop</span>
                    <span>Journal</span>
                    <span>About</span>
                    <span className="cartick-preview-menu__cart">
                        { showIcon && <CartGlyph width="13" height="13" /> }
                        { showCount && (
                            <span className="cartick-preview-menu__count">3</span>
                        ) }
                        { showPrice && (
                            <span className="cartick-preview-menu__price">$208.00</span>
                        ) }
                    </span>
                </nav>
            </div>
            <div className="cartick-preview-menu__hero">
                <div className="cartick-preview-menu__h">Spring 26</div>
                <div className="cartick-preview-menu__sub">Woven with intent.</div>
            </div>
        </div>
    );
};

export default MenuCartPreview;
