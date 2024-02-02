import FormControl from "../components/FormControl";
import Select from "../components/Select";
import TabPanel from "../components/TabPanel";
import {useEffect, useState} from "react";
import Api from "../Utilites/Api";

const StickyCart = () => {
    const [colorOption, setColorOptions] = useState( '' );

    useEffect( () => {
        Api.get( '/cartick/v1/settings' ). then( ( res ) => {
            setColorOptions( res.data.cart_btn.cart_btn_simple_padding );
        })
    }, []);

    return(
        <TabPanel id="sticky-cart">
            <FormControl>
                <Select placeholder="Demo Select" id="demo-select" value={colorOption} onChange={ (e) => { setColorOptions( e.target.value ) } } items={[{ label: "Apple", value: "🍎" }, { label: "Banana", value: "🍌" }, { label: "Orange", value: "🍊" }]} />
            </FormControl>
        </TabPanel>
    )
}
export default StickyCart;