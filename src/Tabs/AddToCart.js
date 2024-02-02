import {useEffect, useState} from "react";
import TabPanel from "../components/TabPanel";
import FormControl from "../components/FormControl";
import {PopOverPicker} from "../components/popOverPicker";
import Api from "../Utilites/Api";

const AddToCart = () => {
    const [cartBtnColor, setCartBtnColor] = useState('#aabbcc');
    const [cartBtnBG, setCartBtnBG] = useState('#aabbcc');

    useEffect( () => {
        Api.get( '/cartick/v1/settings' ). then( ( res ) => {
            setCartBtnColor( res.data.cart_btn.cart_btn_simple_color );
            setCartBtnBG( res.data.cart_btn.cart_btn_simple_background );
        })
    }, []);

    return (
        <TabPanel id="add-to-cart">
            <FormControl>
                <PopOverPicker placeholder="Button Color" color={cartBtnColor} onChange={setCartBtnColor} />
            </FormControl>
            <FormControl>
                <PopOverPicker placeholder="Button Background" color={cartBtnBG} onChange={setCartBtnBG} />
            </FormControl>
        </TabPanel>
    )
}
export default AddToCart;