import React from 'react';

const TextInput = ( { value, onChange, placeholder, type = 'text' } ) => (
    <input
        className="cartick-cinput"
        type={ type }
        value={ value ?? '' }
        placeholder={ placeholder }
        onChange={ ( e ) => onChange( e.target.value ) }
    />
);

export default TextInput;
