import { Nav, Item } from "./components/Menu"
const Menu = () => {
    return (
        <Nav mainTab>
            <Item active="active" name="General" id="general"/>
            <Item name="Add to Cart Button" id="add-to-cart" />
            <Item name="Sticky Cart" id="sticky-cart" />
            {/*<Item name="Off Canvas Cart" id="off-canvas-cart" />*/}
            <Item name="Menu Cart" id="menu-cart" />
        </Nav>
    );
}

export default Menu;
