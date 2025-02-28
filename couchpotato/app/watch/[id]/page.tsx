'use client'

import { useState, useEffect, use } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Tabs from '@radix-ui/react-tabs'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Star, Bookmark, X } from "@phosphor-icons/react"
import { Content } from '@/types/tmdb/movie'
import { getMovieDetails } from '@/lib/tmdb/getMovieDetails'



export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params)
	const [content, setContent] = useState<Content | null>(null)
	const [selectedSource, setSelectedSource] = useState('source1')
	const [watchLater, setWatchLater] = useState<Content[]>([])
	const [showWatchLater, setShowWatchLater] = useState(false)

	useEffect(() => {
		const fetchContent = async () => {
			try {
				const data = await getMovieDetails(id)
				setContent({
					...data,
					id: data.id.toString(),
					genres: data.genres.map(g => g.name),
					posterPath: data.poster_path ?? '',
					backdropPath: data.backdrop_path ?? '',
					cast: data.cast?.map(actor => ({
						...actor,
						profilePath: actor.profile_path ?? ''
					})) ?? []
				})
			} catch (error) {
				console.error('Error fetching movie details:', error)
			}
		}
		fetchContent()
	}, [id])

	if (!content) {
		return (
			<div className="min-h-screen bg-gray-900 flex items-center justify-center">
				<div className="text-white">Loading...</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-900">
			{/* Backdrop */}
			<div className="relative h-[60vh]">
				{content.backdropPath && (
					<>
						<div
							className="absolute inset-0 bg-cover bg-center"
							style={{ backgroundImage: `url(${content.backdropPath})` }}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
					</>
				)}
			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 -mt-32 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Video Player Column */}
					<div className="lg:col-span-2 space-y-6">
						{/* Video Player */}
						<div className="bg-gray-800 rounded-lg overflow-hidden">
							<div className="relative pt-[56.25%]">
								<iframe
									src={`/embed/${selectedSource}/${id}`}
									className="absolute inset-0 w-full h-full"
									allowFullScreen
								/>
								<button
									onClick={() => {/* Toggle watch later */ }}
									className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-purple-600 transition-colors"
								>
									<Bookmark />
								</button>
							</div>
						</div>

						{/* Source Selector */}
						<div className="bg-gray-800 rounded-lg p-6">
							<Tabs.Root defaultValue="english">
								<Tabs.List className="flex gap-2 mb-4">
									<Tabs.Trigger
										value="english"
										className="px-4 py-2 rounded-lg data-[state=active]:bg-purple-600"
									>
										English Sources
									</Tabs.Trigger>
									<Tabs.Trigger
										value="french"
										className="px-4 py-2 rounded-lg data-[state=active]:bg-purple-600"
									>
										French Sources
									</Tabs.Trigger>
								</Tabs.List>

								<Tabs.Content value="english" className="space-y-2">
									{/* English source buttons */}
								</Tabs.Content>
								<Tabs.Content value="french" className="space-y-2">
									{/* French source buttons */}
								</Tabs.Content>
							</Tabs.Root>
						</div>
					</div>

					{/* Details Column */}
					<div className="space-y-6">
						{/* Title and Rating */}
						<div className="bg-gray-800 rounded-lg p-6">
							<h1 className="text-2xl font-bold mb-2">{content.title}</h1>
							<div className="flex items-center gap-4 text-gray-300">
								<div className="flex items-center">
									<Star className="text-yellow-500 mr-1" />
									<span>{content.vote_average.toFixed(1)}</span>
								</div>
								<span>{new Date(content.release_date).getFullYear()}</span>
								<span>{Math.floor(content.runtime / 60)}h {content.runtime % 60}m</span>
							</div>
							<div className="flex flex-wrap gap-2 mt-3">
								{content.genres.map((genre) => (
									<span key={genre} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
										{genre}
									</span>
								))}
							</div>
						</div>

						{/* Overview */}
						<Collapsible.Root defaultOpen className="bg-gray-800 rounded-lg p-6">
							<Collapsible.Trigger className="flex items-center justify-between w-full">
								<h3 className="text-xl font-semibold">Overview</h3>
							</Collapsible.Trigger>
							<Collapsible.Content className="mt-4">
								<p className="text-gray-300">{content.overview}</p>
							</Collapsible.Content>
						</Collapsible.Root>

						{/* Cast */}
						<Collapsible.Root defaultOpen className="bg-gray-800 rounded-lg p-6">
							<Collapsible.Trigger className="flex items-center justify-between w-full">
								<h3 className="text-xl font-semibold">Cast</h3>
							</Collapsible.Trigger>
							<Collapsible.Content className="mt-4">
								<div className="grid grid-cols-2 gap-4">
									{content.cast.slice(0, 6).map((actor) => (
										<div key={actor.id} className="flex items-center gap-3">
											<img
												src={actor.profilePath || '/placeholder-avatar.png'}
												alt={actor.name}
												className="w-12 h-12 rounded-full object-cover"
											/>
											<div>
												<p className="font-medium">{actor.name}</p>
												<p className="text-sm text-gray-400">{actor.character}</p>
											</div>
										</div>
									))}
								</div>
							</Collapsible.Content>
						</Collapsible.Root>
					</div>
				</div>
			</div>

			{/* Watch Later Dialog */}
			<Dialog.Root open={showWatchLater} onOpenChange={setShowWatchLater}>
				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 bg-black/80" />
					<Dialog.Content className="fixed top-[20%] left-[50%] translate-x-[-50%] w-full max-w-4xl bg-gray-900 rounded-lg">
						<div className="p-6 border-b border-gray-800">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-bold">Watch Later</h2>
								<Dialog.Close className="text-gray-500 hover:text-white">
									<X />
								</Dialog.Close>
							</div>
						</div>
						{/* Watch later content */}
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	)
}
