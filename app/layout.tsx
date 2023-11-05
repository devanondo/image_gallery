import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import { cn } from '@/lib/utils'
import { GalleryContextProvider } from './provider/context-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Image Gallery App',
    description: 'Navigate Image Dang and Drop!',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body
                className={cn(
                    inter.className,
                    'bg-[#edf2f7] min-h-full w-full'
                )}
            >
                <GalleryContextProvider>{children}</GalleryContextProvider>
            </body>
        </html>
    )
}
