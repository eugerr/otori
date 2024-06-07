import { getAnime, getAnimeEpisodes } from '@/actions/anime'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { cache } from '@/lib/cache'
import { formatTitle } from '@/lib/utils'
import { Anime, Episode } from '@/types/anime'
import parse from 'html-react-parser'
import { AlertCircle, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Balancer from 'react-wrap-balancer'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

export default async function InfoPage({
  searchParams,
}: {
  searchParams: { id: string; episodeId?: string }
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
  return (
    <>
      <AnimeInfoSection animeFetcher={getAnimeInfo} />
      <AnimeEpisodeSection
        getAnimeInfo={getAnimeInfo}
        animeFetcher={getAnimeEpisode}
      />
    </>
  )
}

// INFO

type AnimeInfoSectionProps = {
  animeFetcher: () => Promise<Anime>
}

function AnimeInfoSection({ animeFetcher }: AnimeInfoSectionProps) {
  return (
    <Suspense fallback={<AnimeInfoSectionLoader />}>
      <AnimeCardSuspense animeFetcher={animeFetcher} />
    </Suspense>
  )
}

async function AnimeCardSuspense({
  animeFetcher,
}: {
  animeFetcher: () => Promise<Anime>
}) {
  try {
    const res = await animeFetcher()
    return <AnimeInfoCard anime={res} />
  } catch (error: any) {
    console.log(error)
    return notFound()
  }
}

function AnimeInfoCard({ anime }: { anime: Anime }) {
  const { id, image, title, cover, description, status } = anime
  const animeTitle = formatTitle(title)
  return (
    <>
      <Section>
        <div className='flex flex-col gap-6'>
          <div className='relative h-52'>
            <Image
              className='object-cover'
              fill
              src={cover}
              alt={`${animeTitle} image`}
            />
          </div>
          <h3 className='text-3xl font-bold'>
            <Balancer>{animeTitle}</Balancer>
          </h3>

          <h4>
            <Balancer>{parse(description)}</Balancer>
          </h4>
        </div>
      </Section>
      {status === 'Not yet aired' && (
        <Container>
          <Alert variant='warning' className='mt-6'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>This anime has not yet aired</AlertTitle>
            <AlertDescription></AlertDescription>
          </Alert>
        </Container>
      )}
    </>
  )
}

function AnimeInfoSectionLoader() {
  return (
    <div>
      <Skeleton className='w-full h-[40vh]' />
      <Skeleton className='w-1/3 h-10 mt-2' />
      <Skeleton className='w-1/2 h-4 mt-2' />
      <Skeleton className='w-1/4 h-4 mt-2' />
      <Skeleton className='w-1/5 h-4 mt-2' />
      <Skeleton className='w-1/2 h-4 mt-2' />
      <Skeleton className='w-1/4 h-4 mt-2' />
    </div>
  )
}

// EPISODES

export type AnimeEpisodeProps = {
  animeFetcher: () => Promise<Episode[]>
  getAnimeInfo: () => Promise<Anime>
}

export function AnimeEpisodeSection({
  animeFetcher,
  getAnimeInfo,
}: AnimeEpisodeProps) {
  return (
    <Suspense fallback={<AnimeEpisodeLoader />}>
      <AnimeEpisodeSuspense
        getAnimeInfo={getAnimeInfo}
        animeFetcher={animeFetcher}
      />
    </Suspense>
  )
}

export async function AnimeEpisodeSuspense({
  animeFetcher,
  getAnimeInfo,
}: AnimeEpisodeProps) {
  try {
    const res = await animeFetcher()
    const info = await getAnimeInfo()
    return <AnimeEpisodeCards info={info} anime={res} />
  } catch (error: any) {
    console.log(error)
    return notFound()
  }
}

export function AnimeEpisodeCards({
  anime,
  info,
}: {
  anime: Episode[]
  info: Anime
}) {
  return (
    <Section className='flex flex-col gap-6'>
      <h3 className='text-3xl font-bold'>
        <Balancer>Episodes</Balancer>
      </h3>
      {anime.length ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8'>
          {anime.map((data) => (
            <Link
              key={data.id}
              href={`/watch?id=${info.id}&episodeId=${data.id}`}
              className='relative group border overflow-hidden aspect-video'
            >
              <Icon className='group-hover:block hidden absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black' />
              <Icon className='group-hover:block hidden absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black' />
              <Icon className='group-hover:block hidden absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black' />
              <Icon className='group-hover:block hidden absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black' />
              <div className='relative w-full h-full aspect-square transform group-hover:translate-y-full transition duration-300 ease-in-out'>
                <Image
                  src={data.image}
                  className='object-cover absolute inset-0'
                  fill
                  alt={data.title + ' image'}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-2'>
                  <h3 className='text-white text-sm md:text-base font-semibold'>
                    Episode {data.number}
                  </h3>
                </div>
              </div>
              <div className='p-2 absolute inset-0 transform translate-y-full group-hover:translate-y-0 transition duration-300 ease-in-out space-y-2 flex items-center justify-center flex-col gap-2'>
                <Play size={35} />
                <p className='text-sm'>{data.title}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Not episodes available</p>
      )}
    </Section>
  )
}

export function AnimeEpisodeLoader() {
  return (
    <div>
      <Skeleton className='w-1/3 h-10 mt-2' />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-5'>
        <Skeleton className='aspect-video' />
        <Skeleton className='aspect-video' />
        <Skeleton className='aspect-video' />
        <Skeleton className='aspect-video' />
        <Skeleton className='aspect-video' />
      </div>
    </div>
  )
}

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className={className}
      {...rest}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
    </svg>
  )
}
