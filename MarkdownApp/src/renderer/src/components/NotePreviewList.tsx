import { notesMock } from '../store/mocks/index'
import { ComponentProps, JSX } from 'react'
import { NotePreview } from './NotePreview'

export const NotePreviewList = ({ ...props }: ComponentProps<'ul'>): JSX.Element => {
  return (
    <ul {...props}>
      {notesMock.map((note) => (
        <li key={note.title}>
          <NotePreview {...note} />
        </li>
      ))}
    </ul>
  )
}
