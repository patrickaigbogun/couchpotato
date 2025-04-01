"use client";

import { IconProps, IconWeight, UserCircleDashed } from "@phosphor-icons/react";
import { Button, IconButton, Avatar, Text } from "@radix-ui/themes";
import { BaseButtonProps } from "@radix-ui/themes/src/components/base-button.jsx";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export type XButtonProps = {
	href?: string;
	colour:
	| "gray"
	| "gold"
	| "bronze"
	| "brown"
	| "yellow"
	| "amber"
	| "orange"
	| "tomato"
	| "red"
	| "ruby"
	| "crimson"
	| "pink"
	| "plum"
	| "purple"
	| "violet"
	| "iris"
	| "indigo"
	| "blue"
	| "cyan"
	| "teal"
	| "jade"
	| "green"
	| "grass"
	| "lime"
	| "mint"
	| "sky";
	variant: "classic" | "solid" | "soft" | "surface" | "outline" | "ghost";
	weight: IconWeight | undefined;
	children?: ReactNode;
	icon: React.ComponentType<IconProps>;
	type?: "submit" | "reset" | "button" | undefined;
	iconSize?: IconProps["size"];
	size?: BaseButtonProps["size"];
	onClick?: BaseButtonProps["onClick"];
	className?: string;
	disabled?: boolean;
};


export function LinkButtonX({
	href,
	colour,
	variant,
	weight,
	children,
	icon: Icon,
	iconSize,
	size,
	className,
}: XButtonProps) {
	return (
		<a href={href}>
			<Button
				color={colour}
				variant={variant}
				size={size}
				className={className}>
				<Icon size={iconSize} weight={weight} />
				{children}
			</Button>
		</a>
	);
}

export function ButtonX({
	colour,
	variant,
	weight,
	children,
	icon: Icon,
	type,
	className,
	disabled
}: XButtonProps) {
	return (
		<Button
			color={colour}
			variant={variant}
			type={type}
			size={"3"}
			className={className}
			disabled ={disabled}>
			<Icon size={24} weight={weight} />
			{children}
		</Button>
	);
}

export function IconButtonX({
	colour,
	variant,
	weight,
	icon: Icon,
	type,
	size,
	iconSize,
	onClick,
	className,
}: XButtonProps) {
	return (
		<IconButton
			color={colour}
			variant={variant}
			type={type}
			size={size}
			onClick={onClick}
			className={className}>
			<Icon size={iconSize} weight={weight} />
		</IconButton>
	);
}

export function ProfileButton({ compact = false }) {
	const router = useRouter();
	return (
		<Button
			color={'bronze'}
			variant={'solid'}
			size={"3"}
			className="py-6"
			onClick={() => router.push("/auth/login")}
			highContrast>
			{compact ? (
				<Avatar
					size="1"
					src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453"
					fallback="A"
					radius="full"
				/>
			) : (
				<>
					<Avatar
						size="2"
						src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453"
						fallback="A"
						radius="full"
					/>
					<Text>Hello, Oti</Text>
				</>
			)}
		</Button>
	);
}
