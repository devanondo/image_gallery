/* eslint-disable no-console */
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { imageUrl } = await req.json()

        const image = await db.images.create({
            data: {
                imageUrl,
            },
        })

        return NextResponse.json(image)
    } catch (error) {
        console.log('[SERVERS_POST] Error', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const imageUrls = await req.json()

        const image = await db.images.deleteMany({
            where: {
                imageUrl: {
                    in: imageUrls,
                },
            },
        })

        console.log(image)

        return NextResponse.json(image)
    } catch (error) {
        console.log('[SERVERS_POST] Error', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
