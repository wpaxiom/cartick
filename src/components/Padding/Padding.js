const Padding = ({ id , placeholder, position, ...rest }) => {
    return(
        <div className={ 'cartick-padding__' + position + ' cartick-padding__single'}>
            <label htmlFor={ id + '-' + position } className="sr-only">{placeholder}</label>
            <input type="number" id={ id + '-' + position } name={ id + '-' + position } {...rest}/>
        </div>
    )
}

export { Padding }