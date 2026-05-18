import React from 'react';

const Section = ( { title, children } ) => (
    <div className="cartick-section">
        { title && <h3 className="cartick-section__heading">{ title }</h3> }
        <div className="cartick-section__body">{ children }</div>
    </div>
);

export default Section;
