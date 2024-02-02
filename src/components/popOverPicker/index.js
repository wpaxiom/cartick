import React, { useCallback, useRef, useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import useClickOutside from "../../hooks/useClickOutside";
import Labelwrap from "../Labelwrap";

export const PopOverPicker = ({ id, color, onChange, placeholder, tooltext, toolplace, ...rest }) => {
    const popover = useRef();
    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);


    return (
        <div className="cartick-form-control">
            <div className="cartick-content__color cartick-field__wrap">
                { tooltext ?
                    <Labelwrap tooltext={tooltext} toolplace={toolplace}>
                        <label htmlFor={id}>{placeholder}</label>
                    </Labelwrap> :  <label htmlFor={id} className="cartick-field__label">{placeholder}</label>
                }
                <div className="cartick-content__color-swatch-wrap cartick-field__content">
                    <div className="cartick-content__color-inner">
                        <input id={id} name={id} value={color} onChange={ (e) => { onChange( e.target.value ) }} {...rest}/>
                        <div className="cartick-content__color-swatch" onClick={() => toggle(true)} />
                        {isOpen && (
                            <div className="cartick-content__color-popover" ref={popover}>
                                <HexAlphaColorPicker color={color} onChange={onChange} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
