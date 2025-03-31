'use client';

import { Avatar, Box, IconButton } from "@radix-ui/themes";
import { SingleAvatar } from "../reuse/avatar";
import { ProfileButton } from "../reuse/buttons";
import ThemeSwitch from "./themeswitcht";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <div className="flex flex-row justify-between py-1 px-4 md:px-7 fixed top-0 z-30 w-full bg-stone/30 text-gray-500 dark:text-gray-100 backdrop-blur-md overflow-hidden">
                {/* Logo */}
                <SingleAvatar src={'/couchpotato_icon.png'} alt={"couchpotato logo"} size={"3"} w={75} h={75} />

                {/* Desktop Navigation */}
                <nav className="hidden md:flex flex-row items-center justify-center">
                    <ul className="flex flex-row justify-center items-center space-x-4">
                        <li className="flex flex-row cursor-pointer hover:text-gray-500 dark:hover:text-gray-500 transition-colors">Tv Shows</li>
                        <li className="flex flex-row cursor-pointer hover:text-gray-500 dark:hover:text-gray-500 transition-colors">Movies</li>
                        <li className="flex flex-row cursor-pointer hover:text-gray-500 dark:hover:text-gray-500 transition-colors">Anime</li>
                    </ul>
                </nav>

                {/* User Controls */}
                <Box className="flex flex-row items-center justify-center space-x-4">
                    {/* Mobile menu toggle button */}
                    <IconButton
                        className="md:hidden"
                        variant="ghost"
                        color="gray"
                        onClick={toggleMobileMenu}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
                    </IconButton>

                    {/* Profile and Theme buttons - visible on desktop */}
                    <div className="hidden md:block">
                        <ThemeSwitch />
                    </div>
                    <div className="hidden md:block">
                        <ProfileButton />
                    </div>

                    {/* Only show these on mobile */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeSwitch compact />
                        <ProfileButton compact />
                    </div>
                </Box>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="fixed top-[76px] left-0 right-0 bottom-0 bg-white dark:bg-gray-900 z-20 md:hidden p-4">
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex justify-center items-center font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            TV Shows
                        </button>
                        <button className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex justify-center items-center font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            Movies
                        </button>
                        <button className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex justify-center items-center font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            Anime
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;