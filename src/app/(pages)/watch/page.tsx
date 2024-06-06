import { getAnimeStreamingLinks } from '@/actions/anime'
import { AnimeCardSkeleton } from '@/components/Card'
import { Episode, StreamEpisodeResult } from '@/types/anime'
import React, { Suspense } from 'react'

export default function WatchPage({
  searchParams,
}: {
  searchParams: { id: string }
}) {
  console.log(searchParams)
  const getAnimeEpisode = async () =>
    await getAnimeStreamingLinks(searchParams.id)

  return (
    <div>
      <AnimeEpisodeVideo animeFetcher={getAnimeEpisode} />
    </div>
  )
}

type AnimeInfoSectionProps = {
  animeFetcher: () => Promise<StreamEpisodeResult>
}

function AnimeEpisodeVideo({ animeFetcher }: AnimeInfoSectionProps) {
  return (
    <Suspense fallback={<AnimeCardSkeleton />}>
      <AnimeCardSuspense animeFetcher={animeFetcher} />
    </Suspense>
  )
}

async function AnimeCardSuspense({
  animeFetcher,
}: {
  animeFetcher: () => Promise<StreamEpisodeResult>
}) {
  const res = await animeFetcher()
  console.log(res)
  console.log(res.headers.Referer)
  if (res.headers.Referer) {
    return (
      <div className='aspect-video overflow-hidden'>
        <iframe className='w-full h-full' src={res.headers.Referer} />
      </div>
    )
  }
  return <div>episode</div>
}
