import React from 'react';

/**
 * Four-sided padding control (Top / Right / Bottom / Left).
 * Values are read/written individually; the row is rendered as a single
 * compound field.
 */
const Padding = ( { values, onChange } ) => {
    const sides = [
        { key: 'top',    label: 'T' },
        { key: 'right',  label: 'R' },
        { key: 'bottom', label: 'B' },
        { key: 'left',   label: 'L' },
    ];
    return (
        <div className="cartick-padding-row">
            { sides.map( ( s ) => (
                <div key={ s.key } className="cartick-padding-row__cell">
                    <input
                        type="number"
                        value={ values[ s.key ] ?? '' }
                        onChange={ ( e ) => onChange( s.key, Number( e.target.value ) ) }
                    />
                    <span className="cartick-padding-row__label">{ s.label }</span>
                </div>
            ) ) }
        </div>
    );
};

export default Padding;
