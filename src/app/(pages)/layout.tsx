import { ModeToggle } from '@/components/ModeToggle'
import { Nav, NavLink, Search } from '@/components/Navbar'
import { Container } from '@/components/ui/container'
import { Bird } from 'lucide-react'
import React, { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container>
      <Nav>
        <div className='flex items-center'>
          <Bird />
          <NavLink href='/'>Home</NavLink>
          <NavLink href='/'>Latest</NavLink>
          <NavLink href='/'>Trending</NavLink>
          <NavLink href='/'>Popular</NavLink>
        </div>
        <div className='flex items-center gap-2'>
          <Search />
          <ModeToggle />
        </div>
      </Nav>
      {children}
    </Container>
  )
}
