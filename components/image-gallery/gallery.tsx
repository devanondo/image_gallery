'use client'

import { useGalleryContext } from '@/app/provider/context-provider'
import { rectSortingStrategy } from '@dnd-kit/sortable'
import { GridContainer } from './components/GridContainer'
import {
    Sortable,
    Props as SortableProps,
} from './components/Sortable/Sortable'

const Gallery = () => {
    const { images } = useGalleryContext()

    const props: Partial<SortableProps> = {
        adjustScale: true,
        Container: (props: any) => <GridContainer {...props} columns={6} />,
        strategy: rectSortingStrategy,
        wrapperStyle: () => ({
            width: 140,
            height: 140,
        }),
    }

    return (
        <div>
            <Sortable
                items={images}
                {...props}
                wrapperStyle={({ index }) => {
                    if (index === 0) {
                        return {
                            gridRowStart: 'span 2',
                            gridColumnStart: 'span 2',
                        }
                    }

                    return {}
                }}
            />
        </div>
    )
}

export default Gallery
