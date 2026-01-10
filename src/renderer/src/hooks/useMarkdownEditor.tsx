import { MDXEditorMethods } from '@mdxeditor/editor'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import React from 'react'
import { FullNote, NoteContent } from 'src/shared/models'
import { autoSavingTime } from '../../../shared/constants'
import { saveNoteAtom, selectedNoteAtom } from '../store/index'

export const useMarkdownEditor = (): {
  editorRef: React.RefObject<MDXEditorMethods | null>
  selectedNote: FullNote | null
  handleAutoSaving: (content: NoteContent) => Promise<void>
  handleBlur: () => Promise<void>
} => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = React.useRef<MDXEditorMethods>(null)

  const handleAutoSaving = throttle(
    async (content: NoteContent): Promise<void> => {
      if (!selectedNote) return

      await saveNote(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async (): Promise<void> => {
    if (!selectedNote) return

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content != null) {
      saveNote(content)
    }
  }

  return {
    editorRef,
    selectedNote,
    handleAutoSaving,
    handleBlur
  }
}
