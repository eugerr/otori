import { cn } from '@/lib/utils'

// Section Component
type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

export const Section = ({ children, className, id }: SectionProps) => {
  return (
    <section className={cn('py-4 md:py-8', className)} id={id}>
      {children}
    </section>
  )
}
