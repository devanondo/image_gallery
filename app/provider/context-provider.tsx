'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
/* eslint-disable no-unused-vars */
import { ReactNode, createContext, useContext, useState } from 'react'

type GalleryContextType = {
    removeImage: () => void
    addCheckedImage: (url: string) => void
    removeCheckedImage: (url: string) => void
    checkedImage: string[]
}

type Props = {
    children: ReactNode
}

const InitalGalleryContext: GalleryContextType = {
    removeImage: () => {},
    removeCheckedImage: () => {},
    addCheckedImage: () => {},
    checkedImage: [],
}

const GalleryContext = createContext<GalleryContextType>(InitalGalleryContext)

export function useGalleryContext() {
    return useContext(GalleryContext)
}

export function GalleryContextProvider({ children }: Props) {
    const [checkedImage, setCheckedImage] = useState<string[]>([])
    const router = useRouter()

    const removeImage = async () => {
        await axios.delete('/api/images', { data: checkedImage })
        router.refresh()
    }

    const addCheckedImage = (url: string) => {
        if (!checkedImage?.includes(url)) {
            setCheckedImage([...checkedImage, url])
        }
    }
    const removeCheckedImage = (url: string) => {
        if (checkedImage?.includes(url)) {
            setCheckedImage((oldImages) =>
                oldImages.filter((image) => image !== url)
            )
        }
    }

    const value = {
        removeImage,
        addCheckedImage,
        removeCheckedImage,
        checkedImage,
    }
    return (
        <>
            <GalleryContext.Provider value={value}>
                {children}
            </GalleryContext.Provider>
        </>
    )
}
