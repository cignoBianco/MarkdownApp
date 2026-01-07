import { useSetAtom } from 'jotai'
import { JSX } from 'react'
import { LuSignature } from 'react-icons/lu'
import { createEmptyNoteAtom } from '../../store'
import { ActionButton, ActionButtonProps } from './ActionButton'

export const NewNoteButton = ({ ...props }: ActionButtonProps): JSX.Element => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreate = (): void => {
    createEmptyNote()
  }

  return (
    <ActionButton {...props} onClick={handleCreate}>
      <LuSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
