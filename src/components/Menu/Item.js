const Item = (props) => {
    return(
        <li className={props.active}>
            <a href={`#${props.id}`} className={props.id}>
                {props.name}
            </a>
        </li>
    )
}

export { Item }