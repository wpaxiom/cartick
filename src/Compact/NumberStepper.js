import React from 'react';

const NumberStepper = ( { value, onChange, min = 0, max = Infinity, step = 1, suffix } ) => {
    const inc = ( delta ) => {
        const next = Number( value || 0 ) + delta;
        const clamped = Math.max( min, Math.min( max, next ) );
        onChange( clamped );
    };
    return (
        <div className="cartick-stepper-wrap">
            <div className="cartick-stepper">
                <button type="button" onClick={ () => inc( -step ) } aria-label="Decrement">−</button>
                <input
                    type="number"
                    value={ value ?? '' }
                    min={ min }
                    max={ max }
                    onChange={ ( e ) => onChange( Number( e.target.value ) ) }
                />
                <button type="button" onClick={ () => inc( step ) } aria-label="Increment">+</button>
            </div>
            { suffix && <span className="cartick-stepper__suffix">{ suffix }</span> }
        </div>
    );
};

export default NumberStepper;
