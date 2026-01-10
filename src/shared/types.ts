import { NoteContent, NoteInfo } from './models'

export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>
export type CreateNote = () => Promise<NoteInfo['title'] | false>
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>

export type RemoveNote = (title: NoteInfo['title']) => Promise<boolean>
