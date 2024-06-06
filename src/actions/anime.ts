import { ensureUrlEndsWithSlash } from '@/lib/utils'
import { getNextSeason, year } from '@/hooks/use-time'
import axios from 'axios'

const BASE_URL = ensureUrlEndsWithSlash(
  process.env.NEXT_PUBLIC_BACKEND_URL as string
)

const season = getNextSeason()

export async function getAnime(type: string, id?: string) {
  let url: string = ''
  if (type === 'top-rated') {
    url = `${BASE_URL}/meta/anilist/advanced-search?type=ANIME&sort=["SCORE_DESC"]&`
  }
  if (type === 'top-airing') {
    const options = {
      type: 'ANIME',
      season: season,
      year: year.toString(),
      status: 'RELEASING',
      sort: ['["POPULARITY_DESC"]'],
    }

    url = `${BASE_URL}/meta/anilist/advanced-search?type=${options.type}&status=${options.status}&sort=${options.sort}&year=${options.year}&`
  }
  if (type === 'popular') {
    url = `${BASE_URL}/meta/anilist/advanced-search?type=ANIME&sort=["POPULARITY_DESC"]&`
  }
  if (type === 'top') {
    url = `${BASE_URL}/meta/anilist/advanced-search?type=ANIME&status=RELEASING&sort=["POPULARITY_DESC"]&season=${season}&year=${year.toString()}`
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

export async function getAnimeEpisodes(id: string) {
  let url = ''
  url = `${BASE_URL}meta/anilist/episodes/${id}?gogoanime}`

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

export async function getAnimeStreamingLinks(id: string) {
  const url = `${BASE_URL}meta/anilist/watch/${id}`

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
