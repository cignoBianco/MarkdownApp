import { CreateNote, GetNotes, ReadNote, RemoveNote, WriteNote } from '../shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
      removeNote: RemoveNote
    }
  }
}
