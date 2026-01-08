import { ComponentProps, JSX } from 'react'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '../hooks/useNotesList'
import { NotePreview } from './NotePreview'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({
  className,
  onSelect,
  ...props
}: NotePreviewListProps): JSX.Element | null => {
  const { notes, selectedNoteIndex, handleNotesSelect } = useNotesList({ onSelect })

  if (!notes) return null

  if (!notes.length) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {notes.map((note, index) => (
        <NotePreview
          key={note.title + note.lastEditTime}
          isActive={selectedNoteIndex === index}
          onClick={handleNotesSelect(index)}
          {...note}
        />
      ))}
    </ul>
  )
}
