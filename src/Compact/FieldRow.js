import React from 'react';

/**
 * Single settings row from the compact-fields mockup.
 * Label + optional help text on the left; control(s) on the right.
 */
const FieldRow = ( { label, help, children } ) => (
    <div className="cartick-field-row">
        <div className="cartick-field-row__label-col">
            <div className="cartick-field-row__label">{ label }</div>
            { help && <div className="cartick-field-row__help">{ help }</div> }
        </div>
        <div className="cartick-field-row__control">{ children }</div>
    </div>
);

export default FieldRow;
