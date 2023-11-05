import Gallery from '@/components/image-gallery/gallery'
import GalleryHeader from '@/components/image-gallery/header'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db'

export default async function Home() {
    const images = await db.images.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })

    const items = images.map((item) => item.imageUrl)

    return (
        <div className="container py-4">
            {/* Image Gallery container */}
            <div className="bg-white rounded-md overflow-hidden ">
                {/* Gallery Header */}
                <GalleryHeader />

                <Separator />

                {/* Gallery Body */}
                <div className="md:p-6">
                    <Gallery items={items} />
                </div>
            </div>
        </div>
    )
}
