import React from "react";
import Labelwrap from "../Labelwrap";

const Textinput = ({id, placeholder, tooltext, toolplace, ...rest}) => {
    return (
        <div className="cartick-form-control">
            <div className="cartick-content__input cartick-field__wrap">
                { tooltext ?
                    <Labelwrap tooltext={tooltext} toolplace={toolplace}>
                        <label htmlFor={id}>{placeholder}</label>
                    </Labelwrap> :  <label htmlFor={id} className="cartick-field__label">{placeholder}</label>
                }
                <input id={id} name={id} {...rest} className="cartick-field__content" />
            </div>
        </div>
    );
}
export default Textinput;