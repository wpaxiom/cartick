const Heading = ({ title, desc, hasBorder, ...rest }) => {
    return(
        <div className={ 'cartick-section__heading' + ( hasBorder ? ' has-border' : '' ) }>
            <h2 {...rest} >{title}</h2>
            {desc &&
                <p>{desc}</p>
            }
        </div>
    )
}
export default Heading;