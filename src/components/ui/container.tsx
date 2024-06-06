import { cn } from '@/lib/utils'

type ContainerProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

export const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <div className={cn('mx-auto max-w-5xl', 'p-6 sm:p-8', className)} id={id}>
      {children}
    </div>
  )
}
