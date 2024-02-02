import React from "react";
import Labelwrap from "../Labelwrap";

const Select = ({id, placeholder, tooltext, toolplace, items = [], ...rest}) => {
    return (
        <div className="cartick-form-control">
            <div className="cartick-content__select cartick-field__wrap">
                { tooltext ?
                    <Labelwrap tooltext={tooltext} toolplace={toolplace}>
                        <label htmlFor={id}>{placeholder}</label>
                    </Labelwrap> :  <label htmlFor={id} className="cartick-field__label">{placeholder}</label>
                }
                <select id={id} name={id} {...rest} className="cartick-field__content">
                    {items.map((item) => (
                        <option value={item.value}>{item.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Select;