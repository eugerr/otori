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
    async () => await getAnime('trending'),
    ['/', 'trending'],
    { revalidate: 60 * 60 * 24 }
  )

  return (
    <>
      <Hero animeFetcher={getPopular} />
      <AnimeCardContainer title='Trending' animeFetcher={getTrending} />
    </>
  )
}

export default Home
