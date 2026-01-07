import { useSetAtom } from 'jotai'
import { JSX } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { deleteNoteAtom } from '../../store'
import { ActionButton, ActionButtonProps } from './ActionButton'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps): JSX.Element => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = (): void => {
    deleteNote()
  }

  return (
    <ActionButton {...props} onClick={handleDelete}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
