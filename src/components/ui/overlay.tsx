import { cn } from '@/lib/utils'
import React from 'react'

export default function Overlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inset-0 absolute bg-gradient-to-t from-black/70 via-black/50 to-transparent -z-10',
        className
      )}
    />
  )
}
