import React, {useEffect, useState} from "react";
import Api from "./Utilites/Api";
import Header from "./Header";
import Content from "./Content";
import Sidebar from "./Sidebar";

function Settings(){
    const [pageLoader, setPageLoader ] = useState('cartick-wrap__loader');

    useEffect( () => {
        Api.get( '/cartick/v1/settings' ). then( ( res ) => {
            setPageLoader('');
        })
    }, [setPageLoader]);

    return(
        <div className="cartick-wrap__inner">
            { pageLoader && <div className="cartick-wrap__loader-wrap"><div className={pageLoader}></div></div> }
            <Header />
            <Content />
            <Sidebar />
        </div>
    )
}

export default Settings;