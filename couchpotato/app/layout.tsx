import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'
import { Box, Theme } from "@radix-ui/themes";
import ToastProvider from "@/components/providers/toast_provider";
import 'react-toastify/dist/ReactToastify.css';
import "@radix-ui/themes/styles.css";
import "./globals.css";
import Header from "@/components/ui/header";


export const metadata: Metadata = {
	title: "Couchpotato",
	description: "An app for learning",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={''}
			>
				<ThemeProvider>
				<Theme accentColor={'bronze'} grayColor={'olive'} radius={'full'} scaling="100%" >
					<ToastProvider>
						<Header />
						<Box >
							{children}
						</Box>
					</ToastProvider>
				</Theme>
				</ThemeProvider>
			</body>
		</html>
	);
}
