import React from 'react';

/**
 * For enums with 2-4 options. options is [{ label, value }].
 */
const Segmented = ( { value, onChange, options } ) => (
    <div className="cartick-segmented">
        { options.map( ( o ) => (
            <button
                key={ o.value }
                type="button"
                className={ value === o.value ? 'is-active' : '' }
                onClick={ () => onChange( o.value ) }
            >
                { o.label }
            </button>
        ) ) }
    </div>
);

export default Segmented;
