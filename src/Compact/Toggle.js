import React from 'react';

/**
 * Pure visual toggle (button styled as a pill). Distinct from the form Switch
 * which wraps a hidden checkbox.
 */
const Toggle = ( { on, onChange, size, label } ) => (
    <button
        type="button"
        className={ `cartick-toggle ${ size === 'lg' ? 'cartick-toggle--lg' : '' } ${ on ? 'is-on' : '' }` }
        aria-pressed={ !! on }
        aria-label={ label }
        onClick={ ( e ) => { e.stopPropagation(); onChange( ! on ); } }
    />
);

export default Toggle;
