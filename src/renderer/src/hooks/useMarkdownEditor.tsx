import { FullNote } from '@renderer/shared/models'
import { selectedNoteAtom } from '@store/index'
import { useAtomValue } from 'jotai'

export const useMarkdownEditor = (): {
  selectedNote: FullNote | null
} => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  // const handleContentAdded = (content: string) => async () => {
  //   setSelectedNoteIndex(index)

  //   if (onSelect) {
  //     onSelect()
  //   }
  // }

  return {
    selectedNote
  }
}
