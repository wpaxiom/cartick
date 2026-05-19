import React from 'react';

/**
 * Stripe-pattern placeholder used inside every preview render.
 * Keeps the design feeling like a "mock" without pulling external assets.
 */
const PlaceholderImage = ( { width = '100%', height = 64, radius = 6, label } ) => (
    <div
        className="cartick-preview-ph"
        style={ {
            width,
            height,
            borderRadius: radius,
        } }
    >
        { label && <span>{ label }</span> }
    </div>
);

export default PlaceholderImage;
