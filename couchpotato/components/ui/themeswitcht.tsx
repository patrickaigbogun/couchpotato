"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Select, Flex } from "@radix-ui/themes";
import { Sun, Moon, Desktop } from "@phosphor-icons/react";

const ThemeSwitch = ({ compact = false }) => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const [selectedTheme, setSelectedTheme] = useState(theme || "system");

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
		setSelectedTheme(theme || "system");
	}, [theme]);

	if (!mounted) {
		return null;
	}

	const getThemeIcon = (themeType: string) => {
		switch (themeType) {
			case "light":
				return <Sun size={compact ? 16 : 20} weight={'duotone'} />;
			case "dark":
				return <Moon size={compact ? 16 : 20} weight={'duotone'} />;
			case "system":
			default:
				return <Desktop size={compact ? 16 : 20} weight={'duotone'} />;
		}
	};

	return (
		<div className={`cursor-pointer ${compact ? "p-1" : "p-2"}`}>
			<Select.Root
				value={selectedTheme}
				size={'3'}
				onValueChange={(value) => {
					setSelectedTheme(value);
					setTheme(value);
				}}
			>
				<Select.Trigger
					variant='surface'
					color='bronze'
				>
					<Flex align="center" gap="1">
						{getThemeIcon(selectedTheme)}
						{!compact && (
							<span className="capitalize">
								{selectedTheme === "system" ? "Auto" : selectedTheme}
							</span>
						)}
					</Flex>
				</Select.Trigger>
				<Select.Content variant='solid' color='bronze' highContrast>
					<Select.Item value="system" >
						<Flex align={'center'} direction={'row'} >
							<Desktop size={18} weight="regular" />
							<span>Auto</span>
						</Flex>
					</Select.Item>
					<Select.Item value="dark" >
						<Flex align={'center'} direction={'row'} >
							<Moon size={18} weight="regular" />
							<span>Dark</span>
						</Flex>
					</Select.Item>
					<Select.Item value="light" >
						<Flex align={'center'} direction={'row'} >
							<Sun size={18} weight="regular" />
							<span>Light</span>
						</Flex>
					</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
	);
};

export default ThemeSwitch;
