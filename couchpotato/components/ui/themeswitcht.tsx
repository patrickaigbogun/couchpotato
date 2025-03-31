"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Select } from "@radix-ui/themes";

const ThemeSwitch = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const [selectedTheme, setSelectedTheme] = useState("select your theme");

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<Select.Root
			value={selectedTheme === "select your theme" ? undefined : selectedTheme}
			onValueChange={(value) => {
				setSelectedTheme(value);
				setTheme(value);
			}}
		>
			<Select.Trigger placeholder={selectedTheme} variant='classic' color='brown' />
			<Select.Content variant='solid' color='bronze' highContrast >
				<Select.Item value="system">System</Select.Item>
				<Select.Item value="dark">Dark</Select.Item>
				<Select.Item value="light">Light</Select.Item>
			</Select.Content>
		</Select.Root>
	);
};

export default ThemeSwitch;
