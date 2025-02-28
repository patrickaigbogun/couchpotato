

import { Card, CardContent } from '@/components/ui/reuse/cards'
import { CalendarBlank } from '@phosphor-icons/react/dist/ssr'

interface Post {
	title: string
	date: string
}

interface SectionTemplateProps {
	title: string
	subtitle: string
	posts: Post[]
}

export default function SectionTemplate({ title, subtitle, posts }: SectionTemplateProps) {
	return (
		<section  className="container mx-auto flex flex-col gap-y-4">
				<h2 className="text-3xl font-bold mb-2">{title}</h2>
				<p className="text-gray-400 font-semibold">{subtitle}</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{posts.map((post, index) => (
						<Card key={index} className="hover:shadow-lg transition-shadow duration-300">
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-2">{post.title}</h3>
								<div className="flex items-center text-gray-500">
									<CalendarBlank className="mr-2" size={16} />
									<span>{post.date}</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
		</section>
	)
}

