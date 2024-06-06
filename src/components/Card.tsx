import { FetchResults } from '@/types/api'
import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowRight, StarIcon } from 'lucide-react'
import { Suspense } from 'react'
import { Anime } from '@/types/anime'
import { formatTitle } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import parse from 'html-react-parser'
import Image from 'next/image'

interface AnimeCardContainerProps {
  animeFetcher: () => Promise<FetchResults>
  title?: string
}

export function AnimeCardContainer({
  animeFetcher,
  title,
}: AnimeCardContainerProps) {
  return (
    <div className='space-y-4 my-5 md:my-10'>
      <div className='flex gap-4 justify-between'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <Button variant='outline' asChild>
          <Link href='/Anime' className='space-x-2'>
            <span>View All</span>
            <ArrowRight className='size-4' />
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        <Suspense
          fallback={
            <>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
            </>
          }
        >
          <AnimeCardSuspense animeFetcher={animeFetcher} />
        </Suspense>
      </div>
    </div>
  )
}

async function AnimeCardSuspense({
  animeFetcher,
}: {
  animeFetcher: () => Promise<FetchResults>
}) {
  const res = await animeFetcher()
  return (await animeFetcher()).results
    .slice(0, 5)
    .map((product) => <AnimeCard key={product.id} {...product} />)
}

function AnimeCard({
  image,
  description,
  title,
  id,
  totalEpisodes,
  popularity,
  rating,
}: Anime) {
  const animeTitle = formatTitle(title)
  return (
    <Link href={`/info?id=${id}`}>
      <Card className='relative group border overflow-hidden'>
        <Icon className='group-hover:block hidden absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black' />
        <Icon className='group-hover:block hidden absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black' />
        <Icon className='group-hover:block hidden absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black' />
        <Icon className='group-hover:block hidden absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black' />
        <div className='relative w-full h-full aspect-square transform group-hover:translate-y-full transition duration-300 ease-in-out'>
          <Image
            src={image}
            className='object-cover absolute inset-0'
            fill
            alt={animeTitle}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-2'>
            <h3 className='text-white text-sm md:text-base font-semibold'>
              {animeTitle}
            </h3>
          </div>
        </div>
        <div className='p-2 absolute inset-0 transform translate-y-full group-hover:translate-y-0 transition duration-300 ease-in-out space-y-2'>
          <CardTitle>{animeTitle}</CardTitle>
          <p className='text-xs font-semibold text-muted-foreground'>
            {totalEpisodes} Episodes
          </p>
          <div className='text-xs font-semibold gap-x-2 text-muted-foreground'>
            {rating && (
              <>
                <span>{rating / 10}/10</span>{' '}
                <StarIcon className='fill-foreground border-none mb-0.5 inline h-3 w-3' />
              </>
            )}
          </div>

          <div className='line-clamp-4 md:line-clamp-5 lg:line-clamp-[10] text-xs'>
            {parse(description)}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export function AnimeCardSkeleton() {
  return (
    <Card className='overflow-hidden flex flex-col animate-pulse'>
      <div className='w-full aspect-video bg-gray-300' />
      <CardHeader>
        <CardTitle>
          <div className='w-3/4 h-6 rounded-full bg-gray-300' />
        </CardTitle>
        <CardDescription>
          <div className='w-1/2 h-4 rounded-full bg-gray-300' />
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='w-full h-4 rounded-full bg-gray-300' />
        <div className='w-full h-4 rounded-full bg-gray-300' />
        <div className='w-3/4 h-4 rounded-full bg-gray-300' />
      </CardContent>
      <CardFooter>
        <Button className='w-full' disabled size='lg'></Button>
      </CardFooter>
    </Card>
  )
}

const Icon = ({ className, ...rest }: any) => {
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
