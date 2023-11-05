/* eslint-disable no-console */

'use client'

import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const FileUpload = () => {
    const router = useRouter()

    return (
        <UploadDropzone
            endpoint={'galleryImage'}
            onClientUploadComplete={async (res) => {
                await axios.post('/api/images', { imageUrl: res?.[0].url })
                router.refresh()
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
            content={{
                allowedContent: false,
                label: 'Upload',
                button: false,
            }}
            className="px-2 py-2 w-full m-0 h-full"
            appearance={{
                allowedContent: {
                    display: 'none',
                },
                label: {
                    display: 'none',
                },
                button: {
                    fontSize: '12px',
                    width: 'fit-content',
                    padding: '3px 15px',
                    height: '30px',
                    margin: 0,
                },
            }}
        />
    )
}
