'use client'

import { useGalleryContext } from '@/app/provider/context-provider'

const GalleryHeader = () => {
    const { checkedImage, removeImage } = useGalleryContext()

    return (
        <div className="py-3 px-6 flex items-center justify-between gap-x-3">
            <p className="font-semibold text-md">Images</p>

            {checkedImage.length ? (
                <div className="flex items-center gap-x-2">
                    <input
                        type="checkbox"
                        readOnly
                        className="w-4 h-4"
                        checked={checkedImage.length ? true : false}
                    />
                    <p className="font-semibold text-md">Selected Files</p>
                </div>
            ) : (
                ''
            )}

            {checkedImage.length ? (
                <button
                    onClick={() => {
                        removeImage()
                    }}
                    className="border-none bg-none text-red-600 font-bold text-md"
                >
                    Delete Files
                </button>
            ) : (
                ''
            )}
        </div>
    )
}
export default GalleryHeader
