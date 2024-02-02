const TabPanel = ({ children, id , mainTab, active, ...rest }) => {
    return (
        <div id={id} className={`tab-content ${mainTab ? 'mainTab' : 'subTab' } ${id} ${ active ? 'active' : ''}`} {...rest}>
            {children}
        </div>
    )
}

export default TabPanel;