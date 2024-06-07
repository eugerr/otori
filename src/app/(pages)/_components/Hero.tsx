import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { ArrowRight } from 'lucide-react'
import { FetchResults } from '@/types/api'

import Link from 'next/link'
import React, { Suspense } from 'react'
import { Anime } from '@/types/anime'
import { RemoveHTMLTags, formatTitle } from '@/lib/utils'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

interface HeroProps {
  animeFetcher: () => Promise<FetchResults>
}

export function Hero({ animeFetcher }: HeroProps) {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        <Suspense
          fallback={
            <CarouselItem>
              <Section>
                <Skeleton className='w-full h-[60vh]' />
              </Section>
            </CarouselItem>
          }
        >
          <CustomCarouselItemSuspense animeFetcher={animeFetcher} />
        </Suspense>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

async function CustomCarouselItemSuspense({
  animeFetcher,
}: {
  animeFetcher: () => Promise<FetchResults>
}) {
  return (await animeFetcher()).results.map((product) => (
    <CarouselItem key={product.id}>
      <CustomCard {...product} />
    </CarouselItem>
  ))
}

function CustomCard(props: Anime) {
  const { title, description, malId, cover, image, id } = props
  const animeTitle = formatTitle(title)
  return (
    <div className='relative'>
      <Container className='flex flex-col gap-8 relative rounded-md overflow-hidden'>
        <Image
          src={cover}
          fill
          alt={`${animeTitle} Image`}
          className='hidden sm:block object-cover lg:object-cover -z-10'
        />

        <Image
          src={image}
          fill
          alt={`${animeTitle} Image`}
          className='sm:hidden block object-cover object-top lg:object-cover -z-10'
        />
        <div className='inset-0 absolute bg-gradient-to-t from-black/70 via-black/50 to-transparent -z-10' />
        <Badge className='not-prose w-fit' variant='secondary'>
          <Link
            className='group flex items-center gap-1'
            href={`https://myanimelist.net/anime/${malId}`}
            target='_blank'
          >
            Visit MAL
            <ArrowRight className='w-4 transition-all group-hover:-rotate-45' />
          </Link>
        </Badge>
        <h1 className='font-bold text-2xl text-white'>{animeTitle}</h1>
        <div className='flex gap-4 ml-5'>
          <Button size='sm' variant='gooeyLeft'>
            Watch Now
          </Button>
          <Button
            variant='expandIcon'
            Icon={ArrowRightIcon}
            iconPlacement='right'
            size='sm'
          >
            <Link href={`/info?id=${id}`}>Learn More</Link>
          </Button>
        </div>
        <div>
          <p className=' text-white line-clamp-4'>
            {RemoveHTMLTags(description)}
          </p>
        </div>
      </Container>
    </div>
  )
}
