// import { Input } from '@/components/ui/input'
// import { cn } from '@/lib/utils'
// import Link from 'next/link'
// import { SVGProps } from 'react'
// import { ModeToggle } from './ModeToggle'
// import { buttonVariants } from './ui/button'
// import { Container } from './ui/container'

// export default function Navbar() {
//   return (
//     <Container>
//       <nav className='flex items-center'>
//         <Link href='#'>
//           <MountainIcon className='w-6 h-6' />
//           <span className='sr-only'>Acme Inc</span>
//         </Link>
//         <nav className='hidden md:flex items-center gap-5 text-sm font-medium ml-10'>
//           <Link
//             href='#'
//             className={cn(buttonVariants({ variant: 'linkHover2' }))}
//           >
//             Home
//           </Link>
//           <Link
//             href='#'
//             className='hover:underline underline-offset-4'
//             prefetch={false}
//           >
//             Features
//           </Link>
//           <Link
//             href='#'
//             className='hover:underline underline-offset-4'
//             prefetch={false}
//           >
//             Pricing
//           </Link>
//           <Link
//             href='#'
//             className='hover:underline underline-offset-4'
//             prefetch={false}
//           >
//             About
//           </Link>
//           <Link
//             href='#'
//             className='hover:underline underline-offset-4'
//             prefetch={false}
//           >
//             Contact
//           </Link>
//         </nav>
//         <div className='flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4'>
//           <form className='flex-1 ml-auto sm:flex-initial'>
//             <div className='relative'>
//               <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
//               <Input
//                 type='search'
//                 placeholder='Search...'
//                 className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
//               />
//             </div>
//           </form>
//           <ModeToggle />
//         </div>
//       </nav>
//     </Container>
//   )
// }

'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import { Button, buttonVariants } from './ui/button'
import { Container } from './ui/container'
import { ArrowRightIcon, SearchIcon } from 'lucide-react'
import { Input } from './ui/input'

export function Nav({ children }: PropsWithChildren) {
  return <nav className='flex justify-between'>{children}</nav>
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        buttonVariants({ variant: 'linkHover2' }),
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
