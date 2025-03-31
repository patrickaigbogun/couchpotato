import { Avatar } from "@radix-ui/themes";
import { SingleAvatar } from "../reuse/avatar";
import { ProfileButton } from "../reuse/buttons";
import ThemeSwitch from "./themeswitcht";

function Navbar() {
    return (
        <div className="flex flex-row justify-between py-2 px-7 fixed top-0 z-30 w-full bg-stone/30 text-gray-500 backdrop-blur-md mb-24 overflow-hidden">
            <SingleAvatar src={'/couchpotato_icon.png'} alt={"couchpotato logo"} size={"3"} w={75} h={75} />
            <nav className="flex flex-row items-center justify-center">
                <ul className="flex flex-row justify-center items-center space-x-4">
                    <li>some things</li>
                    <li>some things</li>
                    <li>some things</li>
                </ul>
            </nav>
           {/* <ProfileButton/> */}
           <ThemeSwitch/>
        </div>
    );
}

export default Navbar;