import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./globals.css";


export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={` antialiased`}
			>
				<Theme accentColor={'plum'} grayColor={'olive'} radius={'full'} scaling="95%" >
					{children}
				</Theme>
			</body>
		</html>
	);
}
