import Player from '@/components/Player'
import React from 'react'

export default function WatchPage({
  searchParams,
}: {
  searchParams: { id: string }
}) {
  console.log(searchParams)
  return (
    <div>
      <Player />
    </div>
  )
}

// import { getAnimeStreamingLinks } from '@/actions/anime'
// import { AnimeCardSkeleton } from '@/components/Card'
// import Player from '@/components/Player'
// import { Anime, Episode, StreamEpisodeResult } from '@/types/anime'
// import React, { Suspense } from 'react'

// export default function WatchPage({
//   searchParams,
// }: {
//   searchParams: { id: string }
// }) {
//   const getAnimeEpisode = async () =>
//     await getAnimeStreamingLinks(searchParams.id)

//   return (
//     <div>
//       <AnimeEpisodeVideo animeInfoFetcher={} animeFetcher={getAnimeEpisode} />
//     </div>
//   )
// }

// type AnimeInfoSectionProps = {
//   animeFetcher: () => Promise<StreamEpisodeResult>
//   animeInfoFetcher: () => Promise<Anime>
// }

// function AnimeEpisodeVideo({
//   animeFetcher,
//   animeInfoFetcher,
// }: AnimeInfoSectionProps) {
//   return (
//     <Suspense fallback={<AnimeCardSkeleton />}>
//       <AnimeCardSuspense
//         animeInfoFetcher={animeInfoFetcher}
//         animeFetcher={animeFetcher}
//       />
//     </Suspense>
//   )
// }

// async function AnimeCardSuspense({
//   animeFetcher,
//   animeInfoFetcher,
// }: {
//   animeFetcher: () => Promise<StreamEpisodeResult>
//   animeInfoFetcher: () => Promise<Anime>
// }) {
//   const res = await animeFetcher()
//   console.log(res)
//   if (res.headers.Referer) {
//     return (
//       <div className=''>
//         {/* <iframe className='w-full h-full' src={res.headers.Referer} /> */}
//         <Player />
//         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non natus,
//         velit hic quis quas sequi soluta iure, consequuntur aliquid tenetur
//         eaque cupiditate ea temporibus ut unde voluptatum perspiciatis dolorem.
//         Ratione.
//       </div>
//     )
//   }
//   return <div>episode</div>
// }
