import { getAnime, getAnimeEpisodes } from '@/actions/anime'
import { AnimeCardSkeleton } from '@/components/Card'
import { cache } from '@/lib/cache'
import { formatTitle } from '@/lib/utils'
import { Anime, Episode } from '@/types/anime'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default function InfoPage({
  searchParams,
}: {
  searchParams: { id: string }
}) {
  const getAnimeInfo = async () => await getAnime('search', searchParams?.id)
  const getAnimeEpisode = async () => await getAnimeEpisodes(searchParams.id)

  return (
    <>
      <AnimeInfoSection animeFetcher={getAnimeInfo} />
      <AnimeEpisodeSection animeFetcher={getAnimeEpisode} />
    </>
  )
}

type AnimeInfoSectionProps = {
  animeFetcher: () => Promise<Anime>
}

function AnimeInfoSection({ animeFetcher }: AnimeInfoSectionProps) {
  return (
    <Suspense fallback={<AnimeCardSkeleton />}>
      <AnimeCardSuspense animeFetcher={animeFetcher} />
    </Suspense>
  )
}

async function AnimeCardSuspense({
  animeFetcher,
}: {
  animeFetcher: () => Promise<Anime>
}) {
  const res = await animeFetcher()
  console.log(res)
  const { id, image, title, cover } = res
  const animeTitle = formatTitle(title)
  return (
    <div>
      <h1>{animeTitle}</h1>
      <div className='relative w-full h-auto aspect-video'>
        <Image src={cover} className='object-cover' fill alt={animeTitle} />
      </div>
    </div>
  )
}

type AnimeEpisodeSectionProps = {
  animeFetcher: () => Promise<Episode[]>
}
function AnimeEpisodeSection({ animeFetcher }: AnimeEpisodeSectionProps) {
  return (
    <Suspense fallback={<AnimeCardSkeleton />}>
      <AnimeEpisodeSuspense animeFetcher={animeFetcher} />
    </Suspense>
  )
}

async function AnimeEpisodeSuspense({
  animeFetcher,
}: {
  animeFetcher: () => Promise<Episode[]>
}) {
  const res = await animeFetcher()
  return (
    <section className='container mx-auto px-4 py-8 md:py-12 lg:py-16'>
      <h2 className='text-2xl font-bold mb-4 md:mb-6 lg:mb-8'>Episodes</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8'>
        {res.map(({ image, title, description, number, id }) => (
          <Link href={`watch?id=${id}`} key={id} className='flex flex-col'>
            <div className='relative w-full h-auto aspect-square'>
              <Image src={image} className='object-cover' fill alt={title} />
            </div>
            <h3 className='text-lg font-semibold mt-2 md:mt-3 lg:mt-4'>
              Episode - {number} {title}
            </h3>
            <p className='text-gray-500 line-clamp-2 mt-1 md:mt-2 lg:mt-3'>
              {description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
