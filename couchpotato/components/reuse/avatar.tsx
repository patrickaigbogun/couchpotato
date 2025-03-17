import { LogoProps } from "@/types/reuse/index";
import Image from "next/image";


export function SingleAvatar({ src, size = "100vw", alt, w, h }: LogoProps) {
	return (
		<Image 
			className="object-cover" 
			src={src} 
			sizes={size} 
			alt={alt} 
			width={w} 
			height={h}
			priority={true}
		/>
	)
}

export function MultiAvatar({ src, size = "100vw", alt, w, h }: LogoProps) {
	return (
		<div className="flex flex-row gap-x-3">
			{[0, 1].map((index) => (
				<Image
					key={`logo-${index}`}
					className="object-cover"
					src={src}
					sizes={size}
					alt={alt}
					width={w}
					height={h}
					priority={true}
				/>
			))}
		</div>
	)
}
