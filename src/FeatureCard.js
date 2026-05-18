import React from 'react';

const FeatureCard = ( { module: m, enabled, onToggle, onConfigure } ) => {
    return (
        <div className={ `cartick-fcard ${ enabled ? 'is-on' : 'is-off' }` }>
            <div className="cartick-fcard__head">
                <h3 className="cartick-fcard__title">{ m.name }</h3>
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
            <p className="cartick-fcard__desc">{ m.description }</p>
            <div className="cartick-fcard__foot">
                <button
                    type="button"
                    className="cartick-fcard__configure"
                    onClick={ () => onConfigure( m ) }
                >
                    <span className="cartick-fcard__configure-label">Configure</span>
                    <svg
                        className="cartick-fcard__configure-arrow"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default FeatureCard;
