"use client";

import { Avatar, Box, Flex, IconButton } from "@radix-ui/themes";
import { SingleAvatar } from "../reuse/avatar";
import { IconButtonX, ProfileButton } from "../reuse/buttons";
import ThemeSwitch from "./themeswitcht";
import { DotsThreeCircleVertical, DotsThreeOutline, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

function DesktopNav() {
	return (
		<div className=" flex flex-row border-[0.1px] border-stone-900 rounded-full bg-stone-500/30 backdrop-blur-md w-fit h-fit" >
			<nav className="flex flex-row items-center">
				<ul className="flex flex-row items-center space-x-4">
					<li className="flex flex-row cursor-pointer text-white hover:bg-stone-400/30 p-2 rounded-full transition-colors">
						Tv Shows
					</li>
					<li className="flex flex-row cursor-pointer text-white hover:bg-stone-400/30 p-2 rounded-full transition-colors">
						Movies
					</li>
					<li className="flex flex-row cursor-pointer text-white hover:bg-stone-400/30 p-2 rounded-full transition-colors">
						Anime
					</li>
				</ul>
			</nav>
		</div>
	)
}

function DesktopHeader() {
	const [isScrolled, setIsScrolled] = useState(false);
  
	useEffect(() => {
	  const handleScroll = () => {
		if (window.scrollY > 10) {
		  setIsScrolled(true);
		} else {
		  setIsScrolled(false);
		}
	  };
	  
	  window.addEventListener('scroll', handleScroll);
	  return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header 
			className={`fixed top-0 w-full z-50 flex flex-row justify-between items-center p-0 transition-all duration-300 ${
				isScrolled ? 'bg-stone-800/20 backdrop-blur-md' : 'bg-transparent'
			}`}
		>
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
	const [isScrolled, setIsScrolled] = useState(false);
  
	useEffect(() => {
	  const handleScroll = () => {
		if (window.scrollY > 10) {
		  setIsScrolled(true);
		} else {
		  setIsScrolled(false);
		}
	  };
	  
	  window.addEventListener('scroll', handleScroll);
	  return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header 
			className={`fixed top-0 left-0 right-0 w-full z-50 p-4 transition-all duration-300 font-bold ${
				isScrolled ? 'bg-stone-800/20 backdrop-blur-md' : 'bg-transparent'
			}`}
		>
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
				className={`text-white transition-all duration-700 ease-in-out overflow-hidden ${mobileMenuOpen ? 'block mt-4' : 'hidden'}`}
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

