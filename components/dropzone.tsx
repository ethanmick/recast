'use client'

import { DropEvent, FileRejection } from 'react-dropzone'
import { useDropzone } from './files/provider'

type Props = {
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void
  children?: React.ReactNode
}

export const Dropzone = ({ children }: Props) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone()

  return (
    <div {...getRootProps({})}>
      {isDragActive && <DragActive />}
      <input {...getInputProps()} />
      {children}
    </div>
  )
}

function DragActive() {
  return (
    <div className="backdrop-blur-md bg-white/20 fixed inset-0 flex justify-center items-center z-[100]">
      <h2 className="text-center font-light text-7xl">Drop Files Anywhere</h2>
    </div>
  )
}

// function DragActive() {
//   return (
//     <div className="border-4 after:-z-10 bg-white relative after:content-[''] after:absolute after:top-[-4px] after:left-[-4px] after:h-[calc(100%+8px)] after:w-[calc(100%+8px)] after:bg-[linear-gradient(60deg,#f79533,#f37055,#ef4e7b,#a167ab,#5073b8,#1098ad,#07b39b,#6fba82)] after:[background-size:300%_300%] after:animate-border">
//       <div className="z-1">
//         <h2 className="font-thin text-5xl">Drop Files Anywhere</h2>
//       </div>
//     </div>
//   )
// }
