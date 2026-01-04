import { selectedNoteAtom } from '../store'
import { useAtomValue } from 'jotai'

export const useMarkdownEditor = (): {
  selectedNote: {
    content: string
    title: string
    lastEditTime: number
  } | null
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
