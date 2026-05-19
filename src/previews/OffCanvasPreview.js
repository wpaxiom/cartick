import React from 'react';
import PlaceholderImage from './PlaceholderImage';

const OffCanvasPreview = ( { values } ) => {
    const v = values || {};
    const position    = v.oc_position === 'left' ? 'left' : 'right';
    const showImages  = v.oc_show_images !== false;
    const showCount   = v.oc_show_count_in_header !== false;
    const title       = ( typeof v.oc_title === 'string' && v.oc_title.trim() ) || 'Your Cart';
    const btnBg       = v.oc_btn_bg    || '#6B66F7';
    const btnColor    = v.oc_btn_color || '#FFFFFF';
    const btnPosition = v.oc_btn_position || 'bottom-right';

    return (
        <div className="cartick-preview-frame cartick-preview-frame--drawer">
            <div className={ `cartick-preview-drawer cartick-preview-drawer--${ position }` }>
                <div className="cartick-preview-drawer__head">
                    <span className="cartick-preview-drawer__title">{ title }</span>
                    { showCount && (
                        <span className="cartick-preview-drawer__count">2 items</span>
                    ) }
                    <span className="cartick-preview-drawer__close" aria-hidden="true">×</span>
                </div>

                <div className="cartick-preview-drawer__bar">
                    <div className="cartick-preview-drawer__bar-fill" />
                </div>
                <div className="cartick-preview-drawer__bar-text">Add $12.50 more for free shipping</div>

                <ul className="cartick-preview-drawer__items">
                    { [ 'Linen overshirt', 'Stone wash tee' ].map( ( name, i ) => (
                        <li key={ i }>
                            { showImages && <PlaceholderImage width={ 32 } height={ 32 } radius={ 4 } /> }
                            <div className="cartick-preview-drawer__item-body">
                                <span className="cartick-preview-drawer__item-name">{ name }</span>
                                <span className="cartick-preview-drawer__item-meta">Color: Stone</span>
                            </div>
                            <span className="cartick-preview-drawer__item-price">$89</span>
                        </li>
                    ) ) }
                </ul>

                <div className="cartick-preview-drawer__foot">
                    <div className="cartick-preview-drawer__subtotal">
                        <span>Subtotal</span>
                        <span className="cartick-preview-drawer__total">$178.00</span>
                    </div>
                    <button type="button" className="cartick-preview-drawer__cta">Checkout</button>
                </div>
            </div>

            <div
                className={ `cartick-preview-drawer__trigger cartick-preview-drawer__trigger--${ btnPosition }` }
                style={ { background: btnBg, color: btnColor } }
                aria-hidden="true"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                    <circle cx="9" cy="20" r="1.2" />
                    <circle cx="17" cy="20" r="1.2" />
                    <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H6" />
                </svg>
            </div>
        </div>
    );
};

export default OffCanvasPreview;
