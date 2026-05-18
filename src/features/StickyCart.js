import React from 'react';
import Section from '../Compact/Section';
import FieldRow from '../Compact/FieldRow';
import Toggle from '../Compact/Toggle';
import Segmented from '../Compact/Segmented';
import NumberStepper from '../Compact/NumberStepper';

/**
 * Sticky Cart settings — schema-aligned with the legacy cartick_options.sticky_cart shape.
 */
const StickyCart = ( { values, set } ) => {
    const v = values || {};
    return (
        <>
            <Section title="General">
                <FieldRow label="Position" help="Where the sticky panel attaches to the viewport.">
                    <Segmented
                        value={ v.sc_position || 'bottom' }
                        onChange={ ( val ) => set( 'sc_position', val ) }
                        options={ [
                            { label: 'Bottom', value: 'bottom' },
                            { label: 'Top',    value: 'top' },
                        ] }
                    />
                </FieldRow>
                <FieldRow label="Show on desktop">
                    <Toggle on={ !! v.sc_show_on_desktop } onChange={ ( val ) => set( 'sc_show_on_desktop', val ) } />
                </FieldRow>
                <FieldRow label="Show on mobile">
                    <Toggle on={ !! v.sc_show_on_mobile } onChange={ ( val ) => set( 'sc_show_on_mobile', val ) } />
                </FieldRow>
                <FieldRow label="AJAX add to cart" help="Add to cart without a page reload.">
                    <Toggle on={ !! v.sc_ajax_cart } onChange={ ( val ) => set( 'sc_ajax_cart', val ) } />
                </FieldRow>
                <FieldRow label="Show after scrolling" help="Reveal the panel only after the user scrolls past the offset below.">
                    <Toggle on={ !! v.sc_show_on_scroll } onChange={ ( val ) => set( 'sc_show_on_scroll', val ) } />
                </FieldRow>
                { v.sc_show_on_scroll && (
                    <FieldRow label="Scroll offset" help="Distance in pixels before the panel appears.">
                        <NumberStepper
                            value={ Number( v.sc_scroll_offset || 0 ) }
                            onChange={ ( val ) => set( 'sc_scroll_offset', val ) }
                            min={ 0 }
                            max={ 10000 }
                            step={ 50 }
                            suffix="px"
                        />
                    </FieldRow>
                ) }
            </Section>

            <Section title="Display">
                <FieldRow label="Show product image">
                    <Toggle on={ !! v.sc_show_image } onChange={ ( val ) => set( 'sc_show_image', val ) } />
                </FieldRow>
                <FieldRow label="Show price">
                    <Toggle on={ !! v.sc_show_price } onChange={ ( val ) => set( 'sc_show_price', val ) } />
                </FieldRow>
                <FieldRow label="Hide when out of stock">
                    <Toggle on={ !! v.sc_show_out_of_stock } onChange={ ( val ) => set( 'sc_show_out_of_stock', val ) } />
                </FieldRow>
            </Section>

            <Section title="Enable on">
                <FieldRow label="Simple products">
                    <Toggle on={ !! v.sc_enable_on_simple } onChange={ ( val ) => set( 'sc_enable_on_simple', val ) } />
                </FieldRow>
                <FieldRow label="Grouped products">
                    <Toggle on={ !! v.sc_enable_on_grouped } onChange={ ( val ) => set( 'sc_enable_on_grouped', val ) } />
                </FieldRow>
                <FieldRow label="Variable products">
                    <Toggle on={ !! v.sc_enable_on_variable } onChange={ ( val ) => set( 'sc_enable_on_variable', val ) } />
                </FieldRow>
                <FieldRow label="External products">
                    <Toggle on={ !! v.sc_enable_on_external } onChange={ ( val ) => set( 'sc_enable_on_external', val ) } />
                </FieldRow>
            </Section>
        </>
    );
};

export default StickyCart;
