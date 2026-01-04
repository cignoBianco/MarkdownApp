import { ComponentProps, JSX } from "react"
import { twMerge } from "tailwind-merge"

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>): JSX.Element => {
  const title = 'Note Title'

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="text-gray-400">{title}</span>
    </div>
  )
}
