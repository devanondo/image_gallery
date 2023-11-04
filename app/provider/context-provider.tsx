'use client'

/* eslint-disable no-unused-vars */
import { ReactNode, createContext, useContext, useState } from 'react'

type GalleryContextType = {
    images: string[]
    removeImage: () => void
    setImages: (newImages: string[]) => void
    addCheckedImage: (url: string) => void
    removeCheckedImage: (url: string) => void
    checkedImage: string[]
}

type Props = {
    children: ReactNode
}

const InitalGalleryContext: GalleryContextType = {
    images: [],
    removeImage: () => {},
    removeCheckedImage: () => {},
    addCheckedImage: () => {},
    setImages: () => {},
    checkedImage: [],
}

const GalleryContext = createContext<GalleryContextType>(InitalGalleryContext)

export function useGalleryContext() {
    return useContext(GalleryContext)
}

export function GalleryContextProvider({ children }: Props) {
    const [images, setImages] = useState<string[]>([
        'https://i.ibb.co/tBxV04Q/1.png',
        'https://i.ibb.co/k8s2CKW/5.png',
        'https://i.ibb.co/cyqDHpY/4.png',
        'https://i.ibb.co/nrpG6LQ/3.png',
        'https://i.ibb.co/dDNPyrD/7.png',
        'https://i.ibb.co/drdnKJc/6.png',
        'https://i.ibb.co/jz7pw8f/5.png',
        'https://i.ibb.co/txRjhDH/4.jpg',
        'https://i.ibb.co/QH4vWFs/3.png',
    ])
    const [checkedImage, setCheckedImage] = useState<string[]>([])

    const removeImage = () => {
        setImages((oldImages) =>
            oldImages.filter((image) => !checkedImage.includes(image))
        )
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
        images,
        removeImage,
        setImages,
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
