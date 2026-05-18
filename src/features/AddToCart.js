import React from 'react';
import Section from '../Compact/Section';
import FieldRow from '../Compact/FieldRow';
import TextInput from '../Compact/TextInput';
import Toggle from '../Compact/Toggle';
import ColorPicker from '../Compact/ColorPicker';
import SpacingControl from '../Compact/SpacingControl';

/* Schema defaults — mirror the PHP module's settings_schema().
 * Used for reset affordances on the color pickers and spacing control. */
const DEFAULTS = {
    color:      '#ffffff',
    background: '#000000',
    padding:    { top: 15, right: 15, bottom: 15, left: 15 },
};

const AddToCart = ( { values, set } ) => {
    const v = values || {};

    const paddingValues = {
        top:    v.cart_padding_top,
        right:  v.cart_padding_right,
        bottom: v.cart_padding_bottom,
        left:   v.cart_padding_left,
    };
    const setPadding = ( side, val ) => set( `cart_padding_${ side }`, val );

    return (
        <>
            <Section title="Archive page · button label">
                <FieldRow label="Simple product">
                    <TextInput value={ v.simple_text } onChange={ ( val ) => set( 'simple_text', val ) } />
                </FieldRow>
                <FieldRow label="Variable product">
                    <TextInput value={ v.variable_text } onChange={ ( val ) => set( 'variable_text', val ) } />
                </FieldRow>
                <FieldRow label="Grouped product">
                    <TextInput value={ v.grouped_text } onChange={ ( val ) => set( 'grouped_text', val ) } />
                </FieldRow>
                <FieldRow label="External product">
                    <TextInput value={ v.external_text } onChange={ ( val ) => set( 'external_text', val ) } />
                </FieldRow>
            </Section>

            <Section title="Single product · button label">
                <FieldRow label="Simple product">
                    <TextInput value={ v.single_simple_text } onChange={ ( val ) => set( 'single_simple_text', val ) } />
                </FieldRow>
                <FieldRow label="Variable product">
                    <TextInput value={ v.single_variable_text } onChange={ ( val ) => set( 'single_variable_text', val ) } />
                </FieldRow>
                <FieldRow label="Grouped product">
                    <TextInput value={ v.single_grouped_text } onChange={ ( val ) => set( 'single_grouped_text', val ) } />
                </FieldRow>
                <FieldRow label="External product">
                    <TextInput value={ v.single_external_text } onChange={ ( val ) => set( 'single_external_text', val ) } />
                </FieldRow>
            </Section>

            <Section title="Styling">
                <FieldRow label="Custom button styles" help="Apply the colors and padding below to the add-to-cart button.">
                    <Toggle on={ !! v.cart_btn_style } onChange={ ( val ) => set( 'cart_btn_style', val ) } />
                </FieldRow>
                { v.cart_btn_style && (
                    <>
                        <FieldRow label="Text color">
                            <ColorPicker
                                value={ v.cart_color }
                                onChange={ ( val ) => set( 'cart_color', val ) }
                                defaultValue={ DEFAULTS.color }
                            />
                        </FieldRow>
                        <FieldRow label="Background color">
                            <ColorPicker
                                value={ v.cart_background }
                                onChange={ ( val ) => set( 'cart_background', val ) }
                                defaultValue={ DEFAULTS.background }
                            />
                        </FieldRow>
                        <FieldRow label="Padding">
                            <SpacingControl
                                label="PADDING"
                                values={ paddingValues }
                                defaults={ DEFAULTS.padding }
                                onChange={ setPadding }
                            />
                        </FieldRow>
                    </>
                ) }
            </Section>
        </>
    );
};

export default AddToCart;
