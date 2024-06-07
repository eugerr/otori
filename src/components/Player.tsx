'use client'

import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/audio.css'
import '@vidstack/react/player/styles/default/layouts/video.css'

import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react'
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default'

export default function Player() {
  return (
    <MediaPlayer
      src='https://files.vidstack.io/sprite-fight/hls/stream.m3u8'
      viewType='video'
      streamType='on-demand'
      logLevel='warn'
      crossOrigin
      playsInline
      title='Sprite Fight'
      poster='https://files.vidstack.io/sprite-fight/poster.webp'
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
