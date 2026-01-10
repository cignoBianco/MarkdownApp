import { GetNotes } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'
import { NoteContent, NoteInfo } from 'src/shared/models'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'
import { appDirectoryName, fileEncoding, welcomeNoteFilename } from '../../shared/constants'

export const getRootDir = (): string => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (notes.length == 0) {
    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })

    await writeFile(`${rootDir}/${welcomeNoteFilename}`, content, { encoding: fileEncoding })

    notes.push(welcomeNoteFilename)
  }

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote = async (filename: NoteInfo['title']): Promise<NoteContent> => {
  const rootDir = getRootDir()

  const result = readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.error(err)
      return `File is corrupted: ${err.toString()}`
    })

  return result
}

export const createNote = async (): Promise<NoteInfo['title'] | false> => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under ${rootDir}.
      Avoid using other directories!`
    })

    return false
  }

  await writeFile(filePath, '')

  return filename
}

export const writeNote = async (title: NoteInfo['title'], content: NoteContent): Promise<void> => {
  const rootDir = getRootDir()

  writeFile(`${rootDir}/${title}.md`, content, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

export const removeNote = async (title: NoteInfo['title']): Promise<boolean> => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${title}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    return false
  }

  await remove(`${rootDir}/${title}.md`, (err) => {
    if (err) {
      console.error(err)
    }
  })
  return true
}
