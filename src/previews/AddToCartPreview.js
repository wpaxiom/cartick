import React from 'react';
import PlaceholderImage from './PlaceholderImage';

const AddToCartPreview = ( { values } ) => {
    const v = values || {};
    const styled = !! v.cart_btn_style;
    const bg    = styled ? ( v.cart_background || '#000000' ) : '#1A171B';
    const color = styled ? ( v.cart_color || '#ffffff' )      : '#ffffff';
    const top    = Number.isFinite( +v.cart_padding_top )    ? +v.cart_padding_top    : 12;
    const right  = Number.isFinite( +v.cart_padding_right )  ? +v.cart_padding_right  : 16;
    const bottom = Number.isFinite( +v.cart_padding_bottom ) ? +v.cart_padding_bottom : 12;
    const left   = Number.isFinite( +v.cart_padding_left )   ? +v.cart_padding_left   : 16;
    const label  = v.simple_text || 'Add to cart';

    return (
        <div className="cartick-preview-card">
            <PlaceholderImage width="100%" height={ 130 } radius={ 0 } label="product · 1×1" />
            <div className="cartick-preview-card__body">
                <div className="cartick-preview-card__name">Linen overshirt</div>
                <div className="cartick-preview-card__price">From $89.00</div>
                <button
                    type="button"
                    className="cartick-preview-card__btn"
                    style={ {
                        background: bg,
                        color,
                        padding: `${ top }px ${ right }px ${ bottom }px ${ left }px`,
                    } }
                >
                    { label }
                </button>
            </div>
        </div>
    );
};

export default AddToCartPreview;
