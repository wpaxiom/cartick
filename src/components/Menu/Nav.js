const Nav = ({children, mainTab}) => {
    return(
        <div className={"bg-[#fbfbfb] rounded-t-md border-b-1 border-[#F0F0FE]" + ( mainTab ? ' mainTab' : ' subTab' ) }>
            <ul className="flex flex-row flex-start">
                {children}
            </ul>
        </div>
    )
}

export { Nav }