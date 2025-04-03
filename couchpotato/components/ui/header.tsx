"use client";

import { Avatar, Box, Flex, IconButton } from "@radix-ui/themes";
import { SingleAvatar } from "../reuse/avatar";
import { IconButtonX, ProfileButton } from "../reuse/buttons";
import ThemeSwitch from "./themeswitcht";
import { DotsThreeCircleVertical, DotsThreeOutline, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

function DesktopNav() {
	return (
		<div className=" flex flex-row border-[1.5px] border-stone-900 rounded-full bg-stone-500/30 backdrop-blur-md py-2 px-4" >
			<nav className="flex flex-row items-center justify-center">
				<ul className="flex flex-row justify-center items-center space-x-4">
					<li className="flex flex-row cursor-pointer text-white transition-colors">
						Tv Shows
					</li>
					<li className="flex flex-row cursor-pointer text-white transition-colors">
						Movies
					</li>
					<li className="flex flex-row cursor-pointer text-white transition-colors">
						Anime
					</li>
				</ul>
			</nav>
		</div>
	)
}

function DesktopHeader() {
	return (
		<header className="fixed top-0 w-full z-20 flex flex-row justify-between items-center p-0 bg-transparent" >
			<SingleAvatar
				src={"/couchpotato_icon.png"}
				alt={"couchpotato logo"}
				size={"3"}
				w={75}
				h={75}
			/>
			<DesktopNav />
			<div className="flex flex-row">
				<ThemeSwitch />
				<ProfileButton />
			</div>
		</header>

	)
}

function MobileHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="flex flex-col w-[90%] mx-auto p-4 bg-stone-500/30 backdrop-blur-md font-bold  rounded-3xl" >
			<div className="flex items-center justify-between">
				<SingleAvatar
					src={"/couchpotato_icon.png"}
					alt={"couchpotato logo"}
					size={"3"}
					w={75}
					h={75}
				/>
				<div className='flex items-center space-x-1' >
					<IconButtonX
						className="md:hidden"
						colour={"bronze"}
						variant={"soft"}
						weight={"duotone"}
						icon={mobileMenuOpen ? X : DotsThreeCircleVertical}
						iconSize={28}
						size={"4"}
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle mobile menu"
					/>
					<ThemeSwitch compact />
					<ProfileButton compact />
				</div>
			</div>

			<div
				className={`transition-all duration-700 ease-in-out overflow-hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
			>
				<div className="grid grid-cols-2 gap-4">
						<button className="py-2 px-4 bg-stone-900/50 rounded-full flex justify-center items-center font-medium hover:bg-stone-700/30 hover:scale-105 transition-all">
							TV Shows
						</button>
						<button className="py-2 px-4 bg-stone-900/50 rounded-full flex justify-center items-center font-medium hover:bg-stone-700/30 hover:scale-105 transition-all">
							Movies
						</button>
						<button className="py-2 px-4 bg-stone-900/50 rounded-full flex justify-center items-center font-medium hover:bg-stone-700/30 hover:scale-105 transition-all">
							Anime
						</button>
					</div>
			</div>
		</header>

	)
}

function Heaer() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="my-9" >
			<div className="flex flex-row justify-between py-1 px-4 md:px-7 z-30 w-full bg-stone/30 text-gray-500 dark:text-gray-100  overflow-hidden">
				{/* Logo */}
				<SingleAvatar
					src={"/couchpotato_icon.png"}
					alt={"couchpotato logo"}
					size={"3"}
					w={75}
					h={75}
				/>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex flex-row items-center justify-center">
					<ul className="flex flex-row justify-center items-center space-x-4">
						<li className="flex flex-row cursor-pointer text-white transition-colors">
							Tv Shows
						</li>
						<li className="flex flex-row cursor-pointer text-white transition-colors">
							Movies
						</li>
						<li className="flex flex-row cursor-pointer text-white transition-colors">
							Anime
						</li>
					</ul>
				</nav>

				{/* User Controls */}
				{/* Mobile menu toggle button */}



			</div>

			{/* Mobile Navigation Menu */}
			{mobileMenuOpen && (
				<div className="fixed top-[68px] left-1/2 -translate-x-1/2 w-[85%] rounded-3xl bg-stone-500/30 backdrop-blur-md z-20 md:hidden p-4">
					
				</div>
			)}
		</header>
	);
}

export default function Header() {
	const [width, setWidth] = useState<number | null>(null);

	useEffect(() => {
		// This runs on the client only, after the component has mounted
		const handleResize = () => setWidth(window.innerWidth);

		// Set the initial width when component mounts
		handleResize();

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	if (width === null) {
		// Optionally, return a loading state until width is available
		return null;
	}

	if (width > 700) {
		return <DesktopHeader
		// name={name} image={image} 
		/>;
	}
	{
		return <MobileHeader
		// name={name} image={image} 
		/>;
	}

}

