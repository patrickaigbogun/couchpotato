import { Box } from "@radix-ui/themes";

export default function WatchLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<Box>
			{children}
		</Box>
	);
}
