import React from 'react';
import PlaceholderImage from './PlaceholderImage';

const StickyCartPreview = ( { values } ) => {
    const v = values || {};
    const top = v.sc_position === 'top';
    const showImage = v.sc_show_image !== false;
    const showPrice = v.sc_show_price !== false;

    return (
        <div className="cartick-preview-frame cartick-preview-frame--page">
            <div className={ `cartick-preview-sticky ${ top ? 'is-top' : 'is-bottom' }` }>
                { showImage && <PlaceholderImage width={ 32 } height={ 32 } radius={ 4 } /> }
                <div className="cartick-preview-sticky__body">
                    <div className="cartick-preview-sticky__name">Linen overshirt</div>
                    <div className="cartick-preview-sticky__meta">Color: Stone · M</div>
                </div>
                { showPrice && <div className="cartick-preview-sticky__price">$89.00</div> }
                <button type="button" className="cartick-preview-sticky__btn">
                    <span>＋</span> Cart
                </button>
            </div>
        </div>
    );
};

export default StickyCartPreview;
