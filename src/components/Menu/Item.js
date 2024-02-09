const Item = (props) => {
    return(
        <li className={ 'm-0 ' + props.active}>
            <a href={`#${props.id}`} className={props.id} className="b-[#f0f0f0] border-x-1 py-[0.875rem] px-8 items-center text-[#1a171b] flex text-[0.935em] font-medium outline-0 decoration-0 transition-all">
                {props.name}
            </a>
        </li>
    )
}

export { Item }