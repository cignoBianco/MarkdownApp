import { NoteInfo } from '@renderer/shared/models'
import { notesAtom, selectedNoteAtom, selectedNoteIndexAtom } from '../store'
import { useAtom, useAtomValue } from 'jotai'

export const useNotesList = ({
  onSelect
}: {
  onSelect?: () => void
}): {
  notes: NoteInfo[]
  selectedNoteIndex: number | null
  handleNotesSelect: (index: number) => () => Promise<void>
  selectedNoteItem: {
    content: string
    title: string
    lastEditTime: number
  } | null
} => {
  const notes = useAtomValue(notesAtom)

  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  const handleNotesSelect = (index: number) => async () => {
    setSelectedNoteIndex(index)

    if (onSelect) {
      onSelect()
    }
  }

  const selectedNoteItem = useAtomValue(selectedNoteAtom)

  return {
    notes,
    selectedNoteIndex,
    handleNotesSelect,
    selectedNoteItem
  }
}
