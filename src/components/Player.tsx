'use client'

import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/audio.css'
import '@vidstack/react/player/styles/default/layouts/video.css'

import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  PlayerSrc,
  Poster,
  Track,
  useMediaStore,
} from '@vidstack/react'
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default'
import { StreamEpisodeResult } from '@/types/anime'
import { useState } from 'react'
import { useRef } from 'react'

export default function Player({ data }: { data: StreamEpisodeResult }) {
  const player = useRef<MediaPlayerInstance>(null)

  const hasSources = data?.sources ? true : false
  const [src, setSrc] = useState<string>('')

  console.log(data.sources)

  const transformedUrls: any = data.sources.map((item) => {
    let width, height
    switch (item.quality) {
      case '360p':
        width = 640
        height = 360
        break
      case '480p':
        width = 854
        height = 480
        break
      case '720p':
        width = 1280
        height = 720
        break
      case '1080p':
        width = 1920
        height = 1080
        break
      default:
        width = height = null
    }

    return {
      src: item.url,
      type: 'application/x-mpegURL',
      width,
      height,
    }
  })

  const { qualities, quality, autoQuality, canSetQuality } =
    useMediaStore(player)
  console.log(quality)
  if (!hasSources)
    return (
      <div className='aspect-video overflow-hidden'>
        <iframe
          className='w-full h-full overflow-hidden'
          src={data.headers.Referer}
        />
      </div>
    )
  return (
    <MediaPlayer
      src={transformedUrls}
      viewType='video'
      streamType='on-demand'
      logLevel='warn'
      crossOrigin
      playsInline
      title='Sprite Fight'
      // poster={'https://files.vidstack.io/sprite-fight/poster.webp'}
      load='eager'
    >
      <MediaProvider>
        <Poster className='vds-poster' />
      </MediaProvider>
      <DefaultVideoLayout
        thumbnails='https://files.vidstack.io/sprite-fight/thumbnails.vtt'
        icons={defaultLayoutIcons}
      />
    </MediaPlayer>
  )
}
