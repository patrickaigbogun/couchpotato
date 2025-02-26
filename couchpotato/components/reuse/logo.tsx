import { LogoProps } from "@/types/types";
import Image from "next/image";


export function SingleLogo({ src, size, alt, w, h }: LogoProps) {
	return (
		<Image className={'object-cover'} src={src} sizes={size} alt={alt} width={w} height={h} />
	)
}

export function MultiLogo({ src, size, alt, w, h }: LogoProps) {
	return (
		<div className="flex flex-row gap-x-3" >
			<Image className={'object-cover'} src={src} sizes={size} alt={alt} width={w} height={h} />
			<Image className={'object-cover'} src={src} sizes={size} alt={alt} width={w} height={h} />
		</div>
	)
}
