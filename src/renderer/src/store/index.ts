import { GetNotes } from '@shared/types'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { NoteContent, NoteInfo } from 'src/shared/models'
// import { notesMock } from './mocks'

const loadNotes: GetNotes = async () => {
  const notes: NoteInfo[] = await window?.context?.getNotes()

  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) return null

  const selectedNote = notes[selectedNoteIndex]

  const content = await window?.context?.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: content
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now()
    }
)

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote) return

  const notes = get(notesAtom)
  if (!notes) return

  await window.context.writeNote(selectedNote.title, newContent)

  set(
    notesAtom,
    notes.map((note) => {
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }

      return note
    })
  )
})

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  if (!notes) return

  const title = await window?.context?.createNote()

  if (!title) return

  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  }

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

  set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, async (get, set) => {
  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote) return

  await window?.context?.removeNote(selectedNote.title)

  const notes = get(notesAtom)
  if (!notes) return

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )
  set(selectedNoteIndexAtom, null)
})
