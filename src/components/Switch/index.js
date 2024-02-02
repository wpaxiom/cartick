import React from "react";
import Labelwrap from "../Labelwrap";

const Switch = ({ id, placeholder, tooltext, toolplace, ...rest }) => {
    return(
        <div className="cartick-form-control">
            <div className="cartick-content__switch-wrap cartick-field__wrap">
                { tooltext ?
                    <Labelwrap tooltext={tooltext} toolplace={toolplace}>
                        <span className="cartick-content__switch-label">{placeholder}</span>
                    </Labelwrap> :  <span className="cartick-content__switch-label cartick-field__label">{placeholder}</span>
                }
                <div className="cartick-content__switch-content cartick-field__content">
                    <label className="cartick-content__switch">
                        <input type="checkbox" id={id} name={id} {...rest} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}
export default Switch;