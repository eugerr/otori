'use client'

import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, PropsWithChildren } from 'react'
import { Button, buttonVariants } from './ui/button'

export function Nav({ children }: PropsWithChildren) {
  return <nav className='flex justify-between py-3 md:py-6'>{children}</nav>
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        buttonVariants({ variant: 'linkHover2' }),
        'hidden md:flex',
        pathname === props.href && 'bg-background text-foreground'
      )}
    />
  )
}

export function Search() {
  return (
    <Button
      className='px-4 md:px-10'
      variant='expandIcon'
      Icon={SearchIcon}
      iconPlacement='right'
    >
      <p>Search anime...</p>
    </Button>
  )
}
