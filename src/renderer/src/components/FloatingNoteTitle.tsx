import { ComponentProps, JSX } from 'react'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '../hooks/useNotesList'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>): JSX.Element => {
  const { selectedNoteItem } = useNotesList({})

  if (!selectedNoteItem) return <></>

  const title = selectedNoteItem.title

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="text-gray-400">{title}</span>
    </div>
  )
}
