'use client'

import { useState, useEffect, use } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Tabs from '@radix-ui/react-tabs'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Star, Bookmark , X } from "@phosphor-icons/react"

interface Content {
  id: string
  title: string
  overview: string
  posterPath: string
  backdropPath: string
  releaseDate: string
  runtime: number
  voteAverage: number
  genres: string[]
  cast: {
    id: number
    name: string
    character: string
    profilePath: string
  }[]
}

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [content, setContent] = useState<Content | null>(null)
  const [selectedSource, setSelectedSource] = useState('source1')
  const [watchLater, setWatchLater] = useState<Content[]>([])
  const [showWatchLater, setShowWatchLater] = useState(false)

  useEffect(() => {
    // Fetch content details
    const fetchContent = async () => {
      // TODO: Implement API call to fetch content
      // setContent(data)
    }
    fetchContent()
  }, [id])

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Backdrop */}
      <div className="relative h-[60vh]">
        {content?.backdropPath && (
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
                  onClick={() => {/* Toggle watch later */}}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-purple-600 transition-colors"
                >
                  <Bookmark  />
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
            {/* Overview */}
            <Collapsible.Root className="bg-gray-800 rounded-lg p-6">
              <Collapsible.Trigger className="flex items-center justify-between w-full">
                <h3 className="text-xl font-semibold">Overview</h3>
                {/* Add expand/collapse icon */}
              </Collapsible.Trigger>
              <Collapsible.Content className="mt-4">
                <p className="text-gray-300">{content?.overview}</p>
              </Collapsible.Content>
            </Collapsible.Root>

            {/* Cast */}
            <Collapsible.Root className="bg-gray-800 rounded-lg p-6">
              {/* Similar structure for cast section */}
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
                  <X  />
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
