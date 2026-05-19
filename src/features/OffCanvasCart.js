import React from 'react';
import Section from '../Compact/Section';
import FieldRow from '../Compact/FieldRow';
import Segmented from '../Compact/Segmented';
import Select from '../Compact/Select';
import NumberStepper from '../Compact/NumberStepper';
import TextInput from '../Compact/TextInput';
import ColorPicker from '../Compact/ColorPicker';
import Toggle from '../Compact/Toggle';

const OffCanvasCart = ( { values, set } ) => {
    const v = values || {};
    return (
        <>
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
                <FieldRow label="Drawer width" help="Width of the slide-in cart panel (280–600px).">
                    <NumberStepper
                        value={ Number( v.oc_width ) || 380 }
                        onChange={ ( val ) => set( 'oc_width', val ) }
                        min={ 280 }
                        max={ 600 }
                        step={ 10 }
                        suffix="px"
                    />
                </FieldRow>
                <FieldRow label="Header title" help="Heading shown at the top of the drawer. Leave empty for the default.">
                    <TextInput
                        value={ v.oc_title ?? 'Your Cart' }
                        onChange={ ( val ) => set( 'oc_title', val ) }
                        placeholder="Your Cart"
                    />
                </FieldRow>
                <FieldRow label="Show item count in header" help='Add a small "3 items" pill next to the title.'>
                    <Toggle
                        on={ v.oc_show_count_in_header !== false && v.oc_show_count_in_header !== '0' }
                        onChange={ ( val ) => set( 'oc_show_count_in_header', val ) }
                        label="Show item count in header"
                    />
                </FieldRow>
                <FieldRow label="Show product images" help="Display thumbnails next to each cart line.">
                    <Toggle
                        on={ v.oc_show_images !== false && v.oc_show_images !== '0' }
                        onChange={ ( val ) => set( 'oc_show_images', val ) }
                        label="Show product images"
                    />
                </FieldRow>
            </Section>

            <Section title="Trigger button">
                <FieldRow label="Position" help="Where the floating cart button sits on the page.">
                    <Select
                        value={ v.oc_btn_position || 'bottom-right' }
                        onChange={ ( val ) => set( 'oc_btn_position', val ) }
                        options={ [
                            { label: 'Top left',     value: 'top-left' },
                            { label: 'Top right',    value: 'top-right' },
                            { label: 'Bottom left',  value: 'bottom-left' },
                            { label: 'Bottom right', value: 'bottom-right' },
                        ] }
                    />
                </FieldRow>
                <FieldRow label="Background color">
                    <ColorPicker
                        value={ v.oc_btn_bg || '#6B66F7' }
                        onChange={ ( val ) => set( 'oc_btn_bg', val ) }
                        defaultValue="#6B66F7"
                    />
                </FieldRow>
                <FieldRow label="Icon color">
                    <ColorPicker
                        value={ v.oc_btn_color || '#FFFFFF' }
                        onChange={ ( val ) => set( 'oc_btn_color', val ) }
                        defaultValue="#FFFFFF"
                    />
                </FieldRow>
            </Section>

            <Section title="Empty state">
                <FieldRow label="Empty cart message" help='Shown in place of the cart when there are no items.'>
                    <TextInput
                        value={ v.oc_empty_text ?? 'Your cart is empty.' }
                        onChange={ ( val ) => set( 'oc_empty_text', val ) }
                        placeholder="Your cart is empty."
                    />
                </FieldRow>
                <FieldRow label="Continue shopping URL" help="Where the empty-state button sends the visitor. Leave blank for the shop page.">
                    <TextInput
                        value={ v.oc_continue_url ?? '' }
                        onChange={ ( val ) => set( 'oc_continue_url', val ) }
                        placeholder="https://example.com/shop"
                    />
                </FieldRow>
            </Section>

            <Section title="Behavior">
                <FieldRow label="Auto-open on add to cart" help="Slide the drawer open automatically whenever an item is added to the cart.">
                    <Toggle
                        on={ !! v.oc_auto_open }
                        onChange={ ( val ) => set( 'oc_auto_open', val ) }
                        label="Auto-open on add to cart"
                    />
                </FieldRow>
                <FieldRow label="Animation speed" help="How quickly the drawer slides in and out.">
                    <Segmented
                        value={ v.oc_anim_speed || 'normal' }
                        onChange={ ( val ) => set( 'oc_anim_speed', val ) }
                        options={ [
                            { label: 'Slow',   value: 'slow' },
                            { label: 'Normal', value: 'normal' },
                            { label: 'Fast',   value: 'fast' },
                        ] }
                    />
                </FieldRow>
            </Section>
        </>
    );
};

export default OffCanvasCart;
