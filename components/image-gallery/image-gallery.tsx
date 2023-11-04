// 'use client'

// import { cn } from '@/lib/utils'
// import React, { useRef, useState } from 'react'

// const ImageGallery = () => {
//     const [list, setList] = useState([
//         {
//             title: 'Col 1',
//         },
//         {
//             title: 'Col 2',
//         },
//         {
//             title: 'Col 3',
//         },
//     ])
//     const [dragging, setDragging] = useState(false)
//     const dragItem = useRef()
//     const dragNode = useRef()

//     const handleDragStart = (e, params) => {
//         dragItem.current = params
//         console.log('Drag Start...', params)
//         dragNode.current = e.target
//         dragNode.current.addEventListener('dragend', handleDragEnd)
//         setTimeout(() => {
//             setDragging(true)
//         }, 0)
//     }

//     const handleDragEnd = () => {
//         console.log('Drag Ednging...')
//         dragNode.current.removeEventListener('dragend', handleDragEnd)

//         dragItem.current = null
//         dragNode.current = null

//         setDragging(false)
//     }

//     const handleDragEnter = (e, params) => {
//         console.log(params)
//         if (e.target !== dragNode.current) {
//             console.log('This is not the same node!')

//             console.log(dragItem.current.item)

//             setList((oldList) => {
//                 let newList = JSON.parse(JSON.stringify(oldList))
//                 // newList.splice(params.i, 0, dragItem.current.item)

//                 newList.splice(
//                     params.i,
//                     0,
//                     newList.splice(dragItem.current.i, 1)[0]
//                 )

//                 return newList
//             })
//         }

//         console.log(list)
//     }

//     const getStyles = (params) => {
//         const currentItem = dragItem.current

//         if (currentItem.i === params.i) {
//             return 'bg-blue-500'
//         }
//     }

//     return (
//         <div className="grid grid-cols-5 gap-5">
//             {list.map((item, i) => (
//                 <div
//                     key={i}
//                     draggable
//                     onDragStart={(e) => handleDragStart(e, { item, i })}
//                     onDragEnter={
//                         dragging ? (e) => handleDragEnter(e, { item, i }) : null
//                     }
//                     className={cn(
//                         i === 0
//                             ? 'col-span-2 row-span-2 border bg-blue-200 w-1/1 aspect-[1/1] rounded-md px-4 py-3 group'
//                             : 'col-span-1 border bg-blue-200 w-1/1 aspect-[1/1]',

//                         dragging && getStyles({ item, i })
//                     )}
//                 >
//                     <label htmlFor=""></label>
//                     {item.title}
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default ImageGallery
'use client'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

interface ImageGalleryItem {
    title: string
}

// interface ImageGalleryProps {
//     list?: ImageGalleryItem[]
//     onDragEnter?: (DragEventHandler<HTMLDivElement> | null) | undefined
// }

const ImageGallery = () => {
    const [list, setList] = useState<ImageGalleryItem[]>([
        {
            title: 'Col 1',
        },
        {
            title: 'Col 2',
        },
        {
            title: 'Col 3',
        },
    ])

    const [dragging, setDragging] = useState(false)
    const dragItem = useRef<{ i: number; item: ImageGalleryItem } | null>()
    const dragNode = useRef<HTMLDivElement | null>()

    const handleDragStart = (
        e: any,
        params: { item: ImageGalleryItem; i: number }
    ) => {
        dragItem.current = params
        dragNode.current = e.target as HTMLDivElement
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true)
        }, 0)
    }

    const handleDragEnd = () => {
        dragNode.current!.removeEventListener('dragend', handleDragEnd)

        dragItem.current = null
        dragNode.current = null

        setDragging(false)
    }
    const handleDragEnter = (
        e: any,
        params: { item: ImageGalleryItem; i: number }
    ) => {
        if (e.target !== dragNode.current) {
            setList((oldList) => {
                let newList = JSON.parse(JSON.stringify(oldList))

                newList.splice(
                    params.i,
                    0,
                    newList.splice(dragItem.current?.i, 1)[0]
                )

                return newList
            })
        }
    }

    const getStyles = (params: { item: ImageGalleryItem; i: number }) => {
        const currentItem = dragItem.current

        if (currentItem?.i === params.i) {
            return 'bg-blue-500'
        }
    }

    return (
        <div className="grid grid-cols-5 gap-5">
            {list.map((item, i) => (
                <div
                    key={i}
                    draggable
                    onDragStart={(e) => handleDragStart(e, { item, i })}
                    onDragEnter={
                        dragging
                            ? (e) => handleDragEnter(e, { item, i })
                            : () => {}
                    }
                    className={cn(
                        i === 0
                            ? 'col-span-2 row-span-2 border bg-blue-200 w-1/1 aspect-[1/1] rounded-md px-4 py-3 group'
                            : 'col-span-1 border bg-blue-200 w-1/1 aspect-[1/1]',

                        dragging && getStyles({ item, i })
                    )}
                >
                    <label htmlFor=""></label>
                    {item.title}
                </div>
            ))}
        </div>
    )
}

export default ImageGallery
