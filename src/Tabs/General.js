import FormControl from "../components/FormControl";
import Textinput from "../components/Textinput";
import Switch from "../components/Switch";
import TabPanel from "../components/TabPanel";
import {useEffect, useState} from "react";
import Api from "../Utilites/Api";

const General = ({
        name,
        setName,
        email,
        setEmail,
        enableAddToCart,
        setEnableAddToCart
    }) => {

    useEffect( () => {
        Api.get( '/cartick/v1/settings' ). then( ( res ) => {
            setName( res.data.general.name );
            setEmail( res.data.general.email );
            setEnableAddToCart( res.data.cart_btn.cart_btn_status );
        })
    }, []);

    return (
        <TabPanel id="general" active="active">
            <FormControl>
                <Textinput type="text" placeholder="Your Name" id="name" required value={name} onChange={ (e) => { setName(e.target.value) } }/>
            </FormControl>
            <FormControl>
                <Textinput type="email" placeholder="Your Email" id="email" required value={email} onChange={ (e) => { setEmail(e.target.value) } }/>
            </FormControl>
            <FormControl>
                <Switch checked={enableAddToCart} onChange={ () => setEnableAddToCart((prev) => !prev) }/>
            </FormControl>
        </TabPanel>
    )
}

export default General;