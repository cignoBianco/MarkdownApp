import { useAtom, useAtomValue } from 'jotai'
import { NoteInfo } from 'src/shared/models'
import { notesAtom, selectedNoteIndexAtom } from '../store/index'

export const useNotesList = ({
  onSelect
}: {
  onSelect?: () => void
}): {
  notes: NoteInfo[] | undefined
  selectedNoteIndex: number | null
  handleNotesSelect: (index: number) => () => Promise<void>
} => {
  const notes = useAtomValue(notesAtom)

  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  const handleNotesSelect = (index: number) => async () => {
    setSelectedNoteIndex(index)

    if (onSelect) {
      onSelect()
    }
  }

  return {
    notes,
    selectedNoteIndex,
    handleNotesSelect
  }
}
