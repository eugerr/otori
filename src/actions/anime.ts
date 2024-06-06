import { ensureUrlEndsWithSlash } from '@/lib/utils'
import { getNextSeason, year } from '@/hooks/use-time'
import axios from 'axios'

const BASE_URL = ensureUrlEndsWithSlash(
  process.env.NEXT_PUBLIC_BACKEND_URL as string
)

const season = getNextSeason()

export async function getAnime(type: string, id?: string) {
  let url: string = ''
  if (type === 'trending') {
    url = `${BASE_URL}/meta/anilist/advanced-search?type=ANIME&sort=["SCORE_DESC"]&`
  }
  if (type === 'popular') {
    url = `${BASE_URL}/meta/anilist/advanced-search?type=ANIME&sort=["POPULARITY_DESC"]&`
  }
  if (type === 'top') {
    url = `${BASE_URL}/meta/anilist/advanced-search?type=ANIME&status=RELEASING&sort=["POPULARITY_DESC"]&season=${season}&year=${year.toString()}&`
  }
  if (type === 'upcoming') {
    url = `${BASE_URL}meta/anilist/advanced-search?type=ANIME&status=NOT_YET_RELEASED&sort=["POPULARITY_DESC"]&season=${season}&year=${year.toString()}&`
  }
  if (type === 'search') {
    url = `${BASE_URL}meta/anilist/data/${id}`
  }

  const response = await axios.get(url)

  // After obtaining the response, verify it for errors or empty data
  if (
    response.status !== 200 ||
    (response.data.statusCode && response.data.statusCode >= 400)
  ) {
    const errorMessage = response.data.message || 'Unknown server error'
    throw new Error(
      `Server error: ${
        response.data.statusCode || response.status
      } ${errorMessage}`
    )
  }
  // Assuming response data is valid, store it in the cache
  return response.data // Return the newly fetched data
}
