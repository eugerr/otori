import { Section } from './ui/section'
import { Container } from './ui/container'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/next.svg'
import Balancer from 'react-wrap-balancer'
import { Button } from './ui/button'
import { Github, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer>
      <Section>
        <Container className='grid gap-6'>
          <div className='flex flex-col gap-6 not-prose'>
            <Link href='/'>
              <h3 className='sr-only'>Otori</h3>
              <Image
                src={Logo}
                alt='Otori Logo'
                width={120}
                height={27.27}
                className='dark:invert hover:opacity-75 transition-all'
              />
            </Link>
            <p>
              <Balancer>
                This website doesn&apos;t store any files. It simply shares
                links to media content hosted by third-party services.
              </Balancer>
            </p>
          </div>
          <div className='flex gap-4 flex-col md:flex-row mb-4 md:mb-0'>
            <Link href='/privacy-policy'>Privacy Policy</Link>
            <Link href='/terms-of-service'>Terms of Service</Link>
            <Link href='/cookie-policy'>Cookie Policy</Link>
          </div>
        </Container>
        <Container className='border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center'>
          <div className='flex gap-2'>
            <Button variant='outline' size='icon'>
              <Github />
            </Button>
            <Button variant='outline' size='icon'>
              <Twitter />
            </Button>
            <Button variant='outline' size='icon'>
              <Facebook />
            </Button>
          </div>
          <p className='text-muted-foreground'>
            © <a href='https://github.com/otori'>Otori</a>. All rights reserved.
            2024-present.
          </p>
        </Container>
      </Section>
    </footer>
  )
}
