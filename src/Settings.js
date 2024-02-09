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
        <div className="font-['Nunito'] border-0 leading-6 text-base p-0 align-baseline mt-[1.875em] mr-[1.875em] mb-[1.875em] ml-[0.625em] grid gap-[30px] grid-cols-12 grid-rows-[repeat(2,_auto)] grid-areas-layout relative">
            { pageLoader && <div className="cartick-wrap__loader-wrap"><div className={pageLoader}></div></div> }
            <Header />
            <Content />
            <Sidebar />
        </div>
    )
}

export default Settings;