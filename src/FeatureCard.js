import React from 'react';
import { viewToHref } from './Utilites/urls';

const ChevronRight = ( props ) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        { ...props }
    >
        <path d="M9 6l6 6-6 6" />
    </svg>
);

const FeatureCard = ( { module: m, enabled, onToggle, onConfigure } ) => {
    const Icon = m.Icon;

    return (
        <div className={ `cartick-fcard ${ enabled ? 'is-on' : 'is-off' }` }>
            <div className="cartick-fcard__head">
                <div className={ `cartick-fcard__icon ${ enabled ? 'is-on' : 'is-off' }` }>
                    { Icon && <Icon width="20" height="20" /> }
                </div>
                <button
                    type="button"
                    className={ `cartick-toggle ${ enabled ? 'is-on' : '' }` }
                    aria-pressed={ enabled }
                    aria-label={ `${ enabled ? 'Disable' : 'Enable' } ${ m.name }` }
                    onClick={ ( e ) => {
                        e.stopPropagation();
                        onToggle( m, ! enabled );
                    } }
                />
            </div>
            <div className="cartick-fcard__body">
                <h3 className="cartick-fcard__title">{ m.name }</h3>
                <p className="cartick-fcard__desc">{ m.description }</p>
            </div>
            <div className="cartick-fcard__foot">
                <span className={ `cartick-fcard__status ${ enabled ? 'is-on' : 'is-off' }` }>
                    <span className={ `cartick-dot ${ enabled ? 'is-on' : 'is-off' }` } />
                    { enabled ? 'Enabled' : 'Disabled' }
                </span>
                <a
                    href={ viewToHref( m.id ) }
                    className="cartick-fcard__configure"
                    onClick={ ( e ) => {
                        // Allow modifier-click (cmd/ctrl/middle) to open in new tab;
                        // for plain clicks let the SPA-friendly callback drive nav.
                        if ( e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1 ) return;
                        e.preventDefault();
                        onConfigure( m );
                    } }
                >
                    <span className="cartick-fcard__configure-label">Configure</span>
                    <ChevronRight className="cartick-fcard__configure-arrow" width="12" height="12" />
                </a>
            </div>
        </div>
    );
};

export default FeatureCard;
