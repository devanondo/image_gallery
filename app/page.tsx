import Gallery from '@/components/image-gallery/gallery'
import GalleryHeader from '@/components/image-gallery/header'
import { Separator } from '@/components/ui/separator'

export default function Home() {
    return (
        <div className="container py-4">
            {/* Image Gallery container */}
            <div className="bg-white rounded-md overflow-hidden ">
                {/* Gallery Header */}

                <GalleryHeader />

                <Separator />
                {/* Gallery Body */}

                <div className="p-6">
                    <Gallery />
                </div>
            </div>
        </div>
    )
}
