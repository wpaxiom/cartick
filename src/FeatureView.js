import React from 'react';
import AddToCart from './features/AddToCart';
import StickyCart from './features/StickyCart';
import MenuCart from './features/MenuCart';
import OffCanvasCart from './features/OffCanvasCart';
import SaveStatus from './SaveStatus';

const FEATURE_COMPONENTS = {
    'add-to-cart':     AddToCart,
    'sticky-cart':     StickyCart,
    'menu-cart':       MenuCart,
    'off-canvas-cart': OffCanvasCart,
};

/**
 * FeatureView — direct translation of docs/mockups/compact-fields.html.
 * page-head (back + title + status), module-row (desc + toggle), then
 * sections rendered by the feature-specific component.
 */
const FeatureView = ( { module: m, enabled, values, saveStatus, onBack, onToggle, onFieldChange } ) => {
    const Component = FEATURE_COMPONENTS[ m.id ];

    return (
        <>
            <div className="cartick-page-head">
                <div className="cartick-page-head__left">
                    <button
                        type="button"
                        className="cartick-back-btn"
                        onClick={ onBack }
                    >
                        <span aria-hidden="true">←</span> Dashboard
                    </button>
                    <h1 className="cartick-page-title">{ m.name }</h1>
                </div>
                <SaveStatus status={ saveStatus } />
            </div>

            <div className="cartick-module-row">
                <div className="cartick-module-row__desc">{ m.description }</div>
                <div className="cartick-module-row__toggle">
                    <button
                        type="button"
                        className={ `cartick-toggle cartick-toggle--lg ${ enabled ? 'is-on' : '' }` }
                        aria-pressed={ enabled }
                        aria-label={ `${ enabled ? 'Disable' : 'Enable' } ${ m.name }` }
                        onClick={ () => onToggle( m, ! enabled ) }
                    />
                    <span className={ `cartick-module-row__state${ enabled ? ' is-on' : '' }` }>
                        { enabled ? 'ON' : 'OFF' }
                    </span>
                </div>
            </div>

            { Component
                ? <Component values={ values } set={ onFieldChange } />
                : <div className="cartick-section"><p>Unknown module.</p></div>
            }
        </>
    );
};

export default FeatureView;
