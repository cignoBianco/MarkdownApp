import { NoteInfo } from '@renderer/shared/models'
import { ComponentProps, JSX } from 'react'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({ ...props }: NotePreviewProps): JSX.Element => {
  const date = new Date(props.lastEditTime);

  return (
    <div {...props}>
      {props.title}, {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} - {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
    </div>
  )
}
