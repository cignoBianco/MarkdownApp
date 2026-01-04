import { ComponentProps, JSX } from 'react'
import { NewNoteButton, DeleteNoteButton } from './Button'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>): JSX.Element => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
