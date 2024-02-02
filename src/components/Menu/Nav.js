const Nav = ({children, mainTab}) => {
    return(
        <div className={"cartick-tab__nav" + ( mainTab ? ' mainTab' : ' subTab' ) }>
            <ul>
                {children}
            </ul>
        </div>
    )
}

export { Nav }