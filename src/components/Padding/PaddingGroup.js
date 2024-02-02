const PaddingGroup = ({ placeholder, children }) => {
    return(
        <div className="cartick-form-control">
            <div className="cartick-content__padding-wrap cartick-field__wrap">
                <span className="cartick-field__label">{ placeholder }</span>
                <div className="cartick-content__padding-content cartick-field__content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export { PaddingGroup }