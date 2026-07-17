import MenuSteps from "./menu-steps";
import UserButton from "./user-button";

const Menu = () => {
    return (
        <div className="flex-between gap-5" >
            <MenuSteps />
            <nav className="nav">
                <UserButton/>
            </nav>
        </div>
    )
}

export default Menu;
