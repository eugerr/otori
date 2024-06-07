import {
  getAnime,
  getAnimeEpisodes,
  getAnimeStreamingLinks,
} from '@/actions/anime'
import Player from '@/components/Player'
import { cache } from '@/lib/cache'
import React, { Suspense } from 'react'
import { AnimeEpisodeSection } from '../info/page'
import { StreamEpisodeResult } from '@/types/anime'

export default function WatchPage({
  searchParams,
}: {
  searchParams: { id: string; episodeId: string }
}) {
  console.log(searchParams)

  const getAnimeInfo = cache(
    async () => await getAnime('search', searchParams.id),
    ['/info', searchParams.id]
  )

  const getAnimeEpisode = cache(
    async () => await getAnimeEpisodes(searchParams.id),
    ['/info-episodes', searchParams.id]
  )

  const getStreamingLinks = cache(
    async () => await getAnimeStreamingLinks(searchParams.episodeId),
    ['/watch', searchParams.id]
  )

  return (
    <>
      <AnimeVideoSection animeFetcher={getStreamingLinks} />
      <AnimeEpisodeSection
        getAnimeInfo={getAnimeInfo}
        animeFetcher={getAnimeEpisode}
      />
    </>
  )
}

type AnimeInfoSectionProps = {
  animeFetcher: () => Promise<StreamEpisodeResult>
}

function AnimeVideoSection({ animeFetcher }: AnimeInfoSectionProps) {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
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

  return <Player data={res} />
}
