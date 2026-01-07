import { FullNote } from '@renderer/shared/models'
import { useAtomValue } from 'jotai'
import { selectedNoteAtom } from '../store/index'

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
