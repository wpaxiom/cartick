import React from 'react';

/**
 * Color swatch + hex input. When defaultValue is provided AND the current
 * value differs from it, a small reset button appears that snaps back to
 * the default.
 */
const ColorPicker = ( { value, onChange, defaultValue } ) => {
    const isModified = defaultValue !== undefined && value !== defaultValue;

    return (
        <div className="cartick-cpicker">
            <label className="cartick-cpicker__swatch" style={ { background: value || '#ffffff' } }>
                <input
                    type="color"
                    value={ value || '#ffffff' }
                    onChange={ ( e ) => onChange( e.target.value ) }
                />
            </label>
            <input
                type="text"
                className="cartick-cpicker__hex"
                value={ value ?? '' }
                onChange={ ( e ) => onChange( e.target.value ) }
            />
            { isModified && (
                <button
                    type="button"
                    className="cartick-cpicker__reset"
                    onClick={ () => onChange( defaultValue ) }
                    title="Reset to default"
                    aria-label="Reset color to default"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 109-9 9 9 0 00-6.36 2.64L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                </button>
            ) }
        </div>
    );
};

export default ColorPicker;
