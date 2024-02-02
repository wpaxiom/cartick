import { useEffect, useState } from "react";
import Api from "./Utilites/Api";
import Form from "./components/Form/";
import TabPanel from "./components/TabPanel";
import Textinput from "./components/Textinput";
import Button from "./components/Button";
import { PopOverPicker } from './components/popOverPicker';
import Switch from "./components/Switch";
import Select from "./components/Select";
import Heading from "./components/Heading";
import { Padding, PaddingGroup } from "./components/Padding";
import {Item, Nav} from "./components/Menu";

/* global cartickAdminSettings */
const TabContent = () => {
    /** Submit Button **/
    const [loader , setLoader] = useState('Save Setting');
    const [btnClass , setBtnClass] = useState('');

    /** General Setting **/

    /** Add to Cart Button Setting **/
    const [cartText, setCartText] = useState('Add to cart');
    const [variableCartText, setVariableCartText] = useState('Select Options');
    const [groupedCartText, setGroupedCartText] = useState('Select Options');
    const [externalCartText, setExternalCartText] = useState('Buy Now');

    const [enableCartBtnStyle, setEnableCartBtnStyle] = useState(false);
    const [singleCartText, setSingleCartText] = useState('Add to cart');
    const [singleVariableCartText, setSingleVariableCartText] = useState('Add to cart');
    const [singleGroupedCartText, setSingleGroupedCartText] = useState('Add to cart');
    const [singleExternalCartText, setSingleExternalCartText] = useState('Buy Now');

    const [cartBtnColor, setCartBtnColor] = useState('#ffffff');
    const [cartBtnBG, setCartBtnBG] = useState('');
    const [cartBtnPaddingTop, setCartBtnPaddingTop] = useState('15');
    const [cartBtnPaddingRight, setCartBtnPaddingRight] = useState('15');
    const [cartBtnPaddingBottom, setCartBtnPaddingBottom] = useState('15');
    const [cartBtnPaddingLeft, setCartBtnPaddingLeft] = useState('15');

    /** Sticky Cart Setting **/
    const [enableStickyCart, setEnableStickyCart] = useState(false);
    const [stickyCartPosition, setStickyCartPosition] = useState();

    const [showStickyCartOnDesktop, setShowStickyCartOnDesktop] = useState(true);
    const [showStickyCartOnMobile, setShowStickyCartOnMobile] = useState(true);
    const [enableAjaxCart, setEnableAjaxCart] = useState(true);
    const [showStickyOnScroll, setShowStickyOnScroll] = useState(false);
    const [stickyScrollOffset, setStickyScrollOffset] = useState('500' );
    const [showStickyImage, setShowStickyImage] = useState(true);
    const [showStickyPrice, setShowStickyPrice] = useState(true);
    const [showStickyOutOfStock, setShowStickyOutOfStock] = useState(true);
    const [enableOnSimple, setEnableOnSimple] = useState(true);
    const [enableOnGrouped, setEnableOnGrouped] = useState(true);
    const [enableOnVariable, setEnableOnVariable] = useState(true);
    const [enableOnExternal, setEnableOnExternal] = useState(true);

    /** OffCanvas Cart Setting **/
    const [enableOffCanvasCart, setEnableOffCanvasCart] = useState(false);
    const [offCanvasCartPosition, setOffCanvasCartPosition] = useState();

    /** Menu Cart Setting **/
    const [enableMenuCart, setEnableMenuCart] = useState(false);
    const [selectMenuCart, setSelectMenuCart] = useState('none');
    const [alwaysDisplayMenuCart, setAlwaysDisplayMenuCart] = useState(true);
    const [showOnCartPageMenuCart, setShowOnCartPageMenuCart] = useState(true);
    const [showOnCheckoutPageMenuCart, setShowOnCheckoutPageMenuCart] = useState(true);
    const [displayCartIconMenuCart, setDisplayCartIconMenuCart] = useState(true);
    const [menuContent, setMenuContent] = useState('item-price');
    const [menuCartAlign, setMenuCartAlign] = useState('default');
    const [priceToDisplay, setPriceToDisplay] = useState('subtotal');
    const [customCssMenuCart, setCustomCssMenuCart] = useState('');
    const [enableAjaxMenuCart, SetEnableAjaxMenuCart] = useState(true);

    const handleSubmit = ( e ) => {
        e.preventDefault();

        setLoader( 'Updating...' );
        setBtnClass( 'saving' );

        Api.post( '/cartick/v1/settings', {
            /** General Setting **/

            /** Add to Cart Button Setting **/
            simple_text: cartText,
            variable_text: variableCartText,
            grouped_text: groupedCartText,
            external_text: externalCartText,
            single_simple_text: singleCartText,
            single_variable_text: singleVariableCartText,
            single_grouped_text: singleGroupedCartText,
            single_external_text: singleExternalCartText,

            cart_btn_style: enableCartBtnStyle,
            cart_color: cartBtnColor,
            cart_background: cartBtnBG,
            cart_padding_top: cartBtnPaddingTop,
            cart_padding_right: cartBtnPaddingRight,
            cart_padding_bottom: cartBtnPaddingBottom,
            cart_padding_left: cartBtnPaddingLeft,

            /** Sticky Cart Setting **/
            sc_status: enableStickyCart,
            sc_position: stickyCartPosition,

            sc_show_on_desktop : showStickyCartOnDesktop,
            sc_show_on_mobile : showStickyCartOnMobile,
            sc_ajax_cart : enableAjaxCart,
            sc_show_on_scroll : showStickyOnScroll,
            sc_scroll_offset : stickyScrollOffset,
            sc_show_image : showStickyImage,
            sc_show_price : showStickyPrice,
            sc_show_out_of_stock : showStickyOutOfStock,
            sc_enable_on_simple : enableOnSimple,
            sc_enable_on_grouped : enableOnGrouped,
            sc_enable_on_variable : enableOnVariable,
            sc_enable_on_external : enableOnExternal,


            /** Off Canvas Cart Setting **/
            oc_status: enableOffCanvasCart,
            oc_position: offCanvasCartPosition,

            /** Menu Cart Setting **/
            mc_status: enableMenuCart,
            mc_select_menu_cart: selectMenuCart,
            mc_display_cart: alwaysDisplayMenuCart,
            mc_show_on_cart_page: showOnCartPageMenuCart,
            mc_show_on_checkout_page: showOnCheckoutPageMenuCart,
            mc_display_cart_icon: displayCartIconMenuCart,
            mc_menu_content: menuContent,
            mc_price_to_display: priceToDisplay,
            mc_custom_css: customCssMenuCart,
            mc_menu_align: menuCartAlign,
            mc_ajax_cart: enableAjaxMenuCart,

        }).then( ( res ) => {
            setLoader( 'Save Setting' );
            setBtnClass( '' );
        } )
    }

    useEffect( () => {
        Api.get( '/cartick/v1/settings' ). then( ( res ) => {

            /** Add to Cart Button Setting **/
            setCartText( res.data.cart_btn.simple_text );
            setVariableCartText( res.data.cart_btn.variable_text );
            setGroupedCartText( res.data.cart_btn.grouped_text );
            setExternalCartText( res.data.cart_btn.external_text );
            setSingleCartText( res.data.cart_btn.single_simple_text );
            setSingleVariableCartText( res.data.cart_btn.single_variable_text );
            setSingleGroupedCartText( res.data.cart_btn.single_grouped_text );
            setSingleExternalCartText( res.data.cart_btn.single_external_text );

            setEnableCartBtnStyle( res.data.cart_btn.cart_btn_style );
            setCartBtnColor( res.data.cart_btn.cart_color );
            setCartBtnBG( res.data.cart_btn.cart_background );
            setCartBtnPaddingTop( res.data.cart_btn.cart_padding_top );
            setCartBtnPaddingRight( res.data.cart_btn.cart_padding_right );
            setCartBtnPaddingBottom( res.data.cart_btn.cart_padding_bottom );
            setCartBtnPaddingLeft( res.data.cart_btn.cart_padding_left );

            /** Sticky Cart Setting **/
            setEnableStickyCart( res.data.sticky_cart.sc_status );
            setStickyCartPosition( res.data.sticky_cart.sc_position );

            setShowStickyCartOnDesktop( res.data.sticky_cart.sc_show_on_desktop );
            setShowStickyCartOnMobile( res.data.sticky_cart.sc_show_on_mobile );
            setEnableAjaxCart( res.data.sticky_cart.sc_ajax_cart );
            setShowStickyOnScroll( res.data.sticky_cart.sc_show_on_scroll );
            setStickyScrollOffset( res.data.sticky_cart.sc_scroll_offset );
            setShowStickyImage( res.data.sticky_cart.sc_show_image );
            setShowStickyPrice( res.data.sticky_cart.sc_show_price );
            setShowStickyOutOfStock( res.data.sticky_cart.sc_show_out_of_stock );
            setEnableOnSimple( res.data.sticky_cart.sc_enable_on_simple );
            setEnableOnGrouped( res.data.sticky_cart.sc_enable_on_grouped );
            setEnableOnVariable( res.data.sticky_cart.sc_enable_on_variable );
            setEnableOnExternal( res.data.sticky_cart.sc_enable_on_external );

            /** Sticky Cart Setting **/
            setEnableOffCanvasCart( res.data.off_canvas_cart.oc_status );
            setOffCanvasCartPosition( res.data.off_canvas_cart.oc_position );

            /** Menu Cart Setting **/
            setEnableMenuCart( res.data.menu_cart.mc_status );
            setSelectMenuCart( res.data.menu_cart.mc_select_menu_cart );
            setAlwaysDisplayMenuCart( res.data.menu_cart.mc_display_cart );
            setShowOnCartPageMenuCart( res.data.menu_cart.mc_show_on_cart_page );
            setShowOnCheckoutPageMenuCart( res.data.menu_cart.mc_show_on_checkout_page );
            setDisplayCartIconMenuCart( res.data.menu_cart.mc_display_cart_icon);
            setMenuContent( res.data.menu_cart.mc_menu_content);
            setMenuCartAlign( res.data.menu_cart.mc_menu_align);
            setPriceToDisplay( res.data.menu_cart.mc_price_to_display);
            setCustomCssMenuCart( res.data.menu_cart.mc_custom_css);
            SetEnableAjaxMenuCart( res.data.menu_cart.mc_ajax_cart);
        })
    }, []);

    return (
        <div className="cartick-tab__content">
            <Form onSubmit={ (e) => { handleSubmit( e ) } }>
                <TabPanel id="general" mainTab active>
                    <Switch placeholder="Enable Sticky Cart" checked={enableStickyCart} onChange={ () => setEnableStickyCart((prev) => !prev) }/>
                    <Switch placeholder="Enable Menu Cart" checked={enableMenuCart} onChange={ () => setEnableMenuCart((prev) => !prev) }/>
                </TabPanel>
                <TabPanel id="add-to-cart" mainTab>
                    <Nav>
                        <Item active="active" name="Archive Page" id="add-to-cart-archive" />
                        <Item name="Single Page" id="add-to-cart-single" />
                        <Item name="Styles" id="add-to-cart-style" />
                    </Nav>
                    <TabPanel id="add-to-cart-archive" active>
                        <Textinput type="text" placeholder="Simple Button text" id="simple-cart" required value={cartText} onChange={ (e) => { setCartText( e.target.value ) } }/>
                        <Textinput type="text" placeholder="Variable Button text" id="variable-cart" required value={variableCartText} onChange={ (e) => { setVariableCartText( e.target.value ) } }/>
                        <Textinput type="text" placeholder="Grouped Button text" id="grouped-cart" required value={groupedCartText} onChange={ (e) => { setGroupedCartText( e.target.value ) } }/>
                        <Textinput type="text" placeholder="External Button text" id="external-cart" required value={externalCartText} onChange={ (e) => { setExternalCartText( e.target.value ) } }/>
                    </TabPanel>
                    <TabPanel id="add-to-cart-single">
                        <Textinput type="text" placeholder="Simple Button text" id="single-simple-cart" required value={singleCartText} onChange={ (e) => { setSingleCartText( e.target.value ) } }/>
                        <Textinput type="text" placeholder="Variable Button text" id="single-variable-cart" required value={singleVariableCartText} onChange={ (e) => { setSingleVariableCartText( e.target.value ) } }/>
                        <Textinput type="text" placeholder="Grouped Button text" id="single-grouped-cart" required value={singleGroupedCartText} onChange={ (e) => { setSingleGroupedCartText( e.target.value ) } }/>
                        <Textinput type="text" placeholder="External Button text" id="single-external-cart" required value={singleExternalCartText} onChange={ (e) => { setSingleExternalCartText( e.target.value ) } }/>
                    </TabPanel>
                    <TabPanel id="add-to-cart-style">
                        <Switch placeholder="Enable Cart Styles" checked={enableCartBtnStyle} onChange={ () => setEnableCartBtnStyle((prev) => !prev) }/>
                        { enableCartBtnStyle &&
                            <>
                                <PopOverPicker placeholder="Button Color" color={cartBtnColor} onChange={setCartBtnColor} />
                                <PopOverPicker placeholder="Button Background" color={cartBtnBG} onChange={setCartBtnBG} />
                                <PaddingGroup placeholder="Cart Button Padding">
                                    <Padding placeholder="Cart button Left Padding" id="cart-padding" position="top" value={cartBtnPaddingTop} onChange={ (e) => { setCartBtnPaddingTop( e.target.value ) }  } />
                                    <Padding placeholder="Cart button Left Padding" id="cart-padding" position="right" value={cartBtnPaddingRight} onChange={ (e) => { setCartBtnPaddingRight( e.target.value ) }  } />
                                    <Padding placeholder="Cart button Left Padding" id="cart-padding" position="bottom" value={cartBtnPaddingBottom} onChange={ (e) => { setCartBtnPaddingBottom( e.target.value ) }  } />
                                    <Padding placeholder="Cart button Left Padding" id="cart-padding" position="left" value={cartBtnPaddingLeft} onChange={ (e) => { setCartBtnPaddingLeft( e.target.value ) }  } />
                                </PaddingGroup>
                            </>
                        }
                    </TabPanel>
                </TabPanel>
                <TabPanel id="sticky-cart" mainTab>
                    <Nav>
                        <Item active="active" name="General Settings" id="sc-general" />
                        <Item name="Content Settings" id="sc-contents" />
                        <Item name="Product Compatibility" id="sc-product-compatibility" />
                        {/*<Item name="AJAX Cart" id="sc-ajax" />*/}
                    </Nav>
                    <TabPanel id="sc-general" active>
                        <Switch placeholder="Show on Desktop" checked={showStickyCartOnDesktop} onChange={ () => setShowStickyCartOnDesktop((prev) => !prev) }/>
                        <Switch placeholder="Show on Mobile" checked={showStickyCartOnMobile} onChange={ () => setShowStickyCartOnMobile((prev) => !prev) }/>
                        <Switch placeholder="Show only after scroll" checked={showStickyOnScroll} onChange={ () => setShowStickyOnScroll((prev) => !prev) }/>
                        { showStickyOnScroll &&
                            <Textinput type="number" placeholder="Show Bar after scroll pixels" id="sc-scroll-offset" required value={stickyScrollOffset} onChange={ (e) => { setStickyScrollOffset( e.target.value ) } }/>
                        }
                        <Select placeholder="Sticky Cart Position" id="sticky-cart-position" toolplace="top" value={stickyCartPosition} onChange={ (e) => { setStickyCartPosition( e.target.value ) } } items={ [{ label: "Top", value: "top" }, { label: "Bottom", value: "bottom" }] } />
                    </TabPanel>
                    <TabPanel id="sc-contents">
                        <Switch placeholder="Show image of product" checked={showStickyImage} onChange={ () => setShowStickyImage((prev) => !prev) }/>
                        <Switch placeholder="Show Product price" checked={showStickyPrice} onChange={ () => setShowStickyPrice((prev) => !prev) }/>
                        <Switch placeholder="Hide bar if product is out of stock" checked={showStickyOutOfStock} onChange={ () => setShowStickyOutOfStock((prev) => !prev) }/>
                    </TabPanel>
                    <TabPanel id="sc-product-compatibility">
                        <Switch placeholder="Enable on Simple product" checked={enableOnSimple} onChange={ () => setEnableOnSimple((prev) => !prev) } />
                        <Switch placeholder="Enable on Grouped product" checked={enableOnGrouped} onChange={ () => setEnableOnGrouped((prev) => !prev) } />
                        <Switch placeholder="Enable on variable product" checked={enableOnVariable} onChange={ () => setEnableOnVariable((prev) => !prev) } />
                        <Switch placeholder="Enable on Externla product" checked={enableOnExternal} onChange={ () => setEnableOnExternal((prev) => !prev) } />
                    </TabPanel>
                    {/*<TabPanel id="sc-ajax">
                        <Switch placeholder="Ajax Cart" checked={enableAjaxCart} onChange={ () => setEnableAjaxCart((prev) => !prev) }/>
                    </TabPanel>*/}
                </TabPanel>
                {/*<TabPanel id="off-canvas-cart" mainTab>
                    <Select placeholder="Sticky Cart Position" id="sticky-cart-position" value={offCanvasCartPosition} onChange={ (e) => { setOffCanvasCartPosition( e.target.value ) } } items={ [{ label: "Left", value: "left" }, { label: "Right", value: "right" }] } />
                </TabPanel>*/}
                <TabPanel id="menu-cart" mainTab>
                    <Select placeholder="Select Display Menu" id="menu-cart-select" value={selectMenuCart} onChange={ (e) => { setSelectMenuCart( e.target.value ) } } items={ cartickAdminSettings.menus } />
                    <Switch placeholder="Always Display Cart?" checked={alwaysDisplayMenuCart} onChange={ () => setAlwaysDisplayMenuCart((prev) => !prev) }/>
                    <Switch placeholder="Show on Cart page" checked={showOnCartPageMenuCart} onChange={ () => setShowOnCartPageMenuCart((prev) => !prev) }/>
                    <Switch placeholder="Show on Checkout page" checked={showOnCheckoutPageMenuCart} onChange={ () => setShowOnCheckoutPageMenuCart((prev) => !prev) }/>
                    <Switch placeholder="Display Cart Icon" checked={displayCartIconMenuCart} onChange={ () => setDisplayCartIconMenuCart((prev) => !prev) }/>
                    <Select placeholder="Menu Content" id="menu-cart-display" value={menuContent} onChange={ (e) => { setMenuContent( e.target.value ) } } items={ [{ label: "Items Only", value: "item" }, { label: "Price Only", value: "price"}, { label: "Both Items & Price", value: "item-price" }] } />
                    <Select placeholder="Menu Alignment" id="menu-cart-alignment" value={menuCartAlign} onChange={ (e) => { setMenuCartAlign( e.target.value ) } } items={ [{ label: "Left", value: "left" }, { label: "Right", value: "right" }, { label: "Default", value: "default"}] } />
                    <Select placeholder="Price to Display" id="menu-cart-price" value={priceToDisplay} onChange={ (e) => { setPriceToDisplay( e.target.value ) } } items={ [{ label: "Subtotal", value: "subtotal" }, { label: "Cart Total", value: "cart-total" }, { label: "Checkout Total", value: "checkout-total"}] } />
                    <Textinput type="text" placeholder="Custom CSS class" id="menu-cart-css-class" value={customCssMenuCart} onChange={ (e) => { setCustomCssMenuCart( e.target.value ) } }/>
                    {/*<Switch placeholder="Ajax Menu cart" checked={enableAjaxMenuCart} onChange={ () => SetEnableAjaxMenuCart((prev) => !prev) }/>*/}
                </TabPanel>
                <Button type="submit" className={btnClass} disabled={ !!btnClass }>
                    <span>{loader}</span>
                </Button>
            </Form>
        </div>
    )
}

export default TabContent;