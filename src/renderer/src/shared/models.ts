export type NoteInfo = {
  title: string
  lastEditTime: number
}

export type FullNote = NoteInfo & {
  content: NoteContent
}

export type NoteContent = string
