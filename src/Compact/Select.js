import React from 'react';

/**
 * For enums with >4 options or any select-driven choice. options is
 * [{ label, value }].
 */
const Select = ( { value, onChange, options } ) => (
    <div className="cartick-cselect">
        <select
            value={ value ?? '' }
            onChange={ ( e ) => onChange( e.target.value ) }
        >
            { options.map( ( o ) => (
                <option key={ o.value } value={ o.value }>{ o.label }</option>
            ) ) }
        </select>
        <span className="cartick-cselect__chev" aria-hidden="true">▾</span>
    </div>
);

export default Select;
