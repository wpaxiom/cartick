import React from 'react';
import Section from '../Compact/Section';
import FieldRow from '../Compact/FieldRow';
import Toggle from '../Compact/Toggle';
import Segmented from '../Compact/Segmented';
import Select from '../Compact/Select';
import TextInput from '../Compact/TextInput';

/* global cartickAdminSettings */

const MenuCart = ( { values, set } ) => {
    const v = values || {};
    const menus = cartickAdminSettings?.menus || [];

    return (
        <>
            <Section title="Placement">
                <FieldRow label="Target menu" help="The WordPress nav menu to inject the cart widget into.">
                    <Select
                        value={ v.mc_select_menu_cart }
                        onChange={ ( val ) => set( 'mc_select_menu_cart', val ) }
                        options={ menus.map( ( m ) => ( { label: m.label, value: m.value } ) ) }
                    />
                </FieldRow>
                <FieldRow label="Always display cart">
                    <Toggle on={ !! v.mc_display_cart } onChange={ ( val ) => set( 'mc_display_cart', val ) } />
                </FieldRow>
                <FieldRow label="Show on cart page">
                    <Toggle on={ !! v.mc_show_on_cart_page } onChange={ ( val ) => set( 'mc_show_on_cart_page', val ) } />
                </FieldRow>
                <FieldRow label="Show on checkout page">
                    <Toggle on={ !! v.mc_show_on_checkout_page } onChange={ ( val ) => set( 'mc_show_on_checkout_page', val ) } />
                </FieldRow>
                <FieldRow label="Alignment">
                    <Segmented
                        value={ v.mc_menu_align || 'default' }
                        onChange={ ( val ) => set( 'mc_menu_align', val ) }
                        options={ [
                            { label: 'Left',    value: 'left' },
                            { label: 'Default', value: 'default' },
                            { label: 'Right',   value: 'right' },
                        ] }
                    />
                </FieldRow>
            </Section>

            <Section title="Display">
                <FieldRow label="Show cart icon">
                    <Toggle on={ !! v.mc_display_cart_icon } onChange={ ( val ) => set( 'mc_display_cart_icon', val ) } />
                </FieldRow>
                <FieldRow label="What to show" help="Item count, price total, or both.">
                    <Segmented
                        value={ v.mc_menu_content || 'item' }
                        onChange={ ( val ) => set( 'mc_menu_content', val ) }
                        options={ [
                            { label: 'Items',  value: 'item' },
                            { label: 'Price',  value: 'price' },
                            { label: 'Both',   value: 'item-price' },
                        ] }
                    />
                </FieldRow>
                <FieldRow label="Price to display">
                    <Select
                        value={ v.mc_price_to_display || 'subtotal' }
                        onChange={ ( val ) => set( 'mc_price_to_display', val ) }
                        options={ [
                            { label: 'Subtotal',       value: 'subtotal' },
                            { label: 'Cart total',     value: 'cart-total' },
                            { label: 'Checkout total', value: 'checkout-total' },
                        ] }
                    />
                </FieldRow>
                <FieldRow label="Custom CSS class" help="Added to the widget wrapper for theme overrides.">
                    <TextInput value={ v.mc_custom_css } onChange={ ( val ) => set( 'mc_custom_css', val ) } />
                </FieldRow>
            </Section>
        </>
    );
};

export default MenuCart;
