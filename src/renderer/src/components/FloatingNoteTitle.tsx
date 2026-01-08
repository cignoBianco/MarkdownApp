import { useAtomValue } from 'jotai'
import { ComponentProps, JSX } from 'react'
import { twMerge } from 'tailwind-merge'
import { selectedNoteAtom } from '../store'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>): JSX.Element => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (!selectedNote) return <></>

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="text-gray-400">{selectedNote.title}</span>
    </div>
  )
}
