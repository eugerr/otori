import { cache } from '@/lib/cache'
import { Hero } from './_components/Hero'
import { getAnime } from '@/actions/anime'
import { ONE_DAY } from '@/lib/utils'
import { AnimeCardContainer } from '@/components/Card'

const Home = async () => {
  const getPopular = cache(
    async () => await getAnime('popular'),
    ['/', 'popular'],
    { revalidate: ONE_DAY }
  )

  const getTrending = cache(
    async () => await getAnime('top-airing'),
    ['/', 'top-airing'],
    { revalidate: ONE_DAY }
  )

  const getUpcoming = cache(
    async () => await getAnime('upcoming'),
    ['/', 'upcoming'],
    { revalidate: ONE_DAY }
  )

  return (
    <>
      <Hero animeFetcher={getPopular} />
      <AnimeCardContainer title='Trending' animeFetcher={getTrending} />
      <AnimeCardContainer title='Upcoming' animeFetcher={getUpcoming} />
      <AnimeCardContainer title='Popular' animeFetcher={getPopular} />
    </>
  )
}

export default Home
