const Checkbox = ({ className, text, ...rest }) => {
    return (
        <div className="cartick-form-control">
            <div className="cartick-content__checkbox">
                <label className={className}>
                    <input type="checkbox" {...rest} /> <span>{text}</span>
                </label>
            </div>
        </div>
    );
}
export default Checkbox;