import React from 'react';
import Section from '../Compact/Section';
import FieldRow from '../Compact/FieldRow';
import Segmented from '../Compact/Segmented';

const OffCanvasCart = ( { values, set } ) => {
    const v = values || {};
    return (
        <Section title="Display">
            <FieldRow label="Drawer position" help="Slide the cart in from the left or right edge.">
                <Segmented
                    value={ v.oc_position || 'right' }
                    onChange={ ( val ) => set( 'oc_position', val ) }
                    options={ [
                        { label: 'Left',  value: 'left' },
                        { label: 'Right', value: 'right' },
                    ] }
                />
            </FieldRow>
        </Section>
    );
};

export default OffCanvasCart;
