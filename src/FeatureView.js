import React from 'react';
import AddToCart from './features/AddToCart';
import StickyCart from './features/StickyCart';
import MenuCart from './features/MenuCart';
import OffCanvasCart from './features/OffCanvasCart';
import AddToCartPreview from './previews/AddToCartPreview';
import StickyCartPreview from './previews/StickyCartPreview';
import MenuCartPreview from './previews/MenuCartPreview';
import OffCanvasPreview from './previews/OffCanvasPreview';
import SaveStatus from './SaveStatus';
import { viewToHref } from './Utilites/urls';

const FEATURE_COMPONENTS = {
    'add-to-cart':     AddToCart,
    'sticky-cart':     StickyCart,
    'menu-cart':       MenuCart,
    'off-canvas-cart': OffCanvasCart,
};

const PREVIEW_COMPONENTS = {
    'add-to-cart':     AddToCartPreview,
    'sticky-cart':     StickyCartPreview,
    'menu-cart':       MenuCartPreview,
    'off-canvas-cart': OffCanvasPreview,
};

const FeatureView = ( { module: m, enabled, values, saveStatus, onBack, onToggle, onFieldChange } ) => {
    const Component = FEATURE_COMPONENTS[ m.id ];
    const Preview = PREVIEW_COMPONENTS[ m.id ];
    const Icon = m.Icon;

    return (
        <>
            <div className="cartick-page-head">
                <div className="cartick-page-head__left">
                    <a
                        href={ viewToHref( 'dashboard' ) }
                        className="cartick-back-btn"
                        onClick={ ( e ) => {
                            if ( e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1 ) return;
                            e.preventDefault();
                            onBack();
                        } }
                    >
                        <span aria-hidden="true">←</span> Dashboard
                    </a>
                    <h1 className="cartick-page-title">{ m.name }</h1>
                </div>
                <SaveStatus status={ saveStatus } />
            </div>

            <div className="cartick-feature">
                <div className="cartick-feature__cols">
                    <div className="cartick-feature__settings">
                        <div className={ `cartick-module-row ${ enabled ? 'is-on' : 'is-off' }` }>
                            <div className="cartick-module-row__left">
                                { Icon && (
                                    <div className={ `cartick-module-row__icon ${ enabled ? 'is-on' : 'is-off' }` }>
                                        <Icon width="22" height="22" />
                                    </div>
                                ) }
                                <p className="cartick-module-row__desc">{ m.description }</p>
                            </div>
                            <div className="cartick-module-row__right">
                                <span className={ `cartick-module-row__state${ enabled ? ' is-on' : '' }` }>
                                    { enabled ? 'ON' : 'OFF' }
                                </span>
                                <button
                                    type="button"
                                    className={ `cartick-toggle cartick-toggle--lg ${ enabled ? 'is-on' : '' }` }
                                    aria-pressed={ enabled }
                                    aria-label={ `${ enabled ? 'Disable' : 'Enable' } ${ m.name }` }
                                    onClick={ () => onToggle( m, ! enabled ) }
                                />
                            </div>
                        </div>

                        <div className="cartick-sections-card">
                            { Component
                                ? <Component values={ values } set={ onFieldChange } />
                                : <div className="cartick-section"><p>Unknown module.</p></div>
                            }
                        </div>
                    </div>

                    { Preview && (
                        <aside className="cartick-feature__preview" aria-label="Live preview">
                            <div className="cartick-feature__preview-head">
                                <span className="cartick-feature__preview-eyebrow">Live preview</span>
                            </div>
                            <div className="cartick-feature__preview-stage">
                                <Preview values={ values } />
                            </div>
                            <p className="cartick-feature__preview-note">
                                Preview reflects your settings live. Your storefront may render differently if the theme overrides cart styles.
                            </p>
                        </aside>
                    ) }
                </div>
            </div>
        </>
    );
};

export default FeatureView;
