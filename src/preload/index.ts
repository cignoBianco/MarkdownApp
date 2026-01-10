import { NoteContent, NoteInfo } from '@shared/models'
import { CreateNote, GetNotes, ReadNote, RemoveNote, WriteNote } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolated must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (selectedNoteTitle: NoteInfo['title'], ...args: Parameters<ReadNote>) =>
      ipcRenderer.invoke('readNote', selectedNoteTitle, ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
    writeNote: (title: NoteInfo['title'], content: NoteContent, ...args: Parameters<WriteNote>) =>
      ipcRenderer.invoke('writeNote', title, content, ...args),
    removeNote: (selectedNoteTitle: NoteInfo['title'], ...args: Parameters<RemoveNote>) =>
      ipcRenderer.invoke('removeNote', selectedNoteTitle, ...args)
  })
} catch (error) {
  console.error(error)
}
