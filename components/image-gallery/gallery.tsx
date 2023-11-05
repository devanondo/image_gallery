'use client'

import {
    Sortable,
    Props as SortableProps,
} from '@/components/dnd-kit/components/Sortable/Sortable'
import { rectSortingStrategy } from '@dnd-kit/sortable'
import { GridContainer } from '../dnd-kit/components/GridContainer'

interface GalleryProps {
    items: string[]
}

const Gallery = ({ items }: GalleryProps) => {
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
        <Sortable
            items={items}
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
    )
}

export default Gallery
