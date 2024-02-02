const Button = ({ className, children, ...rest }) => {
    return (
        <div className="cartick-content__btn">
            <button className={`cartick-button ${className}`} {...rest}>
                {children}
            </button>
        </div>
    );
}
export default Button;