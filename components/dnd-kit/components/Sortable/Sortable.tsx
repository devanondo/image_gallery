'use client'

/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import {
    Active,
    CollisionDetection,
    DndContext,
    DragOverlay,
    DropAnimation,
    KeyboardCoordinateGetter,
    MeasuringConfiguration,
    Modifiers,
    PointerActivationConstraint,
    UniqueIdentifier,
    closestCenter,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import {
    AnimateLayoutChanges,
    NewIndexGetter,
    SortableContext,
    SortingStrategy,
    arrayMove,
    rectSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable'

import { createRange } from '../../utilities'
import { Item } from '../Item'
import { List } from '../List'
import { Wrapper } from '../Wrapper'

export interface Props {
    activationConstraint?: PointerActivationConstraint
    animateLayoutChanges?: AnimateLayoutChanges
    adjustScale?: boolean
    collisionDetection?: CollisionDetection
    coordinateGetter?: KeyboardCoordinateGetter
    Container?: any
    dropAnimation?: DropAnimation | null
    getNewIndex?: NewIndexGetter
    handle?: boolean
    itemCount?: number
    items?: UniqueIdentifier[] | any
    measuring?: MeasuringConfiguration
    modifiers?: Modifiers
    renderItem?: any
    removable?: boolean
    reorderItems?: typeof arrayMove
    strategy?: SortingStrategy
    style?: React.CSSProperties
    useDragOverlay?: boolean
    getItemStyles?(args: {
        id: UniqueIdentifier
        index: number
        isSorting: boolean
        isDragOverlay: boolean
        overIndex: number
        isDragging: boolean
    }): React.CSSProperties
    wrapperStyle?(args: {
        active: Pick<Active, 'id'> | null
        index: number
        isDragging: boolean
        id: UniqueIdentifier
    }): React.CSSProperties
    isDisabled?(id: UniqueIdentifier): boolean
}

const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
}

export function Sortable({
    animateLayoutChanges,
    adjustScale = false,
    Container = List,
    collisionDetection = closestCenter,
    dropAnimation = dropAnimationConfig,
    getItemStyles = () => ({}),
    getNewIndex,
    handle = false,
    itemCount = 16,
    items: initialItems,
    isDisabled = () => false,
    measuring,
    modifiers,
    removable,
    renderItem,
    reorderItems = arrayMove,
    strategy = rectSortingStrategy,
    style,
    useDragOverlay = true,
    wrapperStyle = () => ({}),
}: Props) {
    const [items, setItems] = useState<UniqueIdentifier[]>(
        () =>
            initialItems ??
            createRange<UniqueIdentifier>(itemCount, (index) => index + 1)
    )

    useEffect(() => {
        setItems(initialItems)
    }, [initialItems, itemCount])

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

    const isFirstAnnouncement = useRef(true)
    const getIndex = (id: UniqueIdentifier) => items.indexOf(id)
    const activeIndex = activeId ? getIndex(activeId) : -1

    useEffect(() => {
        if (!activeId) {
            isFirstAnnouncement.current = true
        }
    }, [activeId])

    return (
        <DndContext
            collisionDetection={collisionDetection}
            onDragStart={({ active }) => {
                if (!active) {
                    return
                }

                setActiveId(active.id)
            }}
            onDragEnd={({ over }) => {
                setActiveId(null)

                if (over) {
                    const overIndex = getIndex(over.id)
                    if (activeIndex !== overIndex) {
                        setItems((items) =>
                            reorderItems(items, activeIndex, overIndex)
                        )
                    }
                }
            }}
            onDragCancel={() => setActiveId(null)}
            measuring={measuring}
            modifiers={modifiers}
        >
            <Wrapper style={style} center>
                <SortableContext items={items} strategy={strategy}>
                    <Container>
                        {items.map((value, index) => (
                            <SortableItem
                                key={value}
                                id={value}
                                handle={handle}
                                index={index}
                                style={getItemStyles}
                                wrapperStyle={wrapperStyle}
                                disabled={isDisabled(value)}
                                renderItem={renderItem}
                                animateLayoutChanges={animateLayoutChanges}
                                useDragOverlay={useDragOverlay}
                                getNewIndex={getNewIndex}
                            />
                        ))}
                    </Container>
                </SortableContext>
            </Wrapper>

            {typeof document !== 'undefined' && useDragOverlay
                ? createPortal(
                      <DragOverlay
                          adjustScale={adjustScale}
                          dropAnimation={dropAnimation}
                      >
                          {activeId ? (
                              <Item
                                  value={items[activeIndex]}
                                  handle={handle}
                                  renderItem={renderItem}
                                  wrapperStyle={wrapperStyle({
                                      active: { id: activeId },
                                      index: activeIndex,
                                      isDragging: true,
                                      id: items[activeIndex],
                                  })}
                                  style={getItemStyles({
                                      id: items[activeIndex],
                                      index: activeIndex,
                                      isSorting: activeId !== null,
                                      isDragging: true,
                                      overIndex: -1,
                                      isDragOverlay: true,
                                  })}
                                  dragOverlay
                              />
                          ) : null}
                      </DragOverlay>,
                      document.body
                  )
                : null}
        </DndContext>
    )
}

interface SortableItemProps {
    animateLayoutChanges?: AnimateLayoutChanges
    disabled?: boolean
    getNewIndex?: NewIndexGetter
    id: UniqueIdentifier
    index: number
    handle: boolean
    useDragOverlay?: boolean
    onRemove?(id: UniqueIdentifier): void
    style(values: any): React.CSSProperties
    renderItem?(args: any): React.ReactElement
    wrapperStyle: Props['wrapperStyle']
}

export function SortableItem({
    disabled,
    animateLayoutChanges,
    getNewIndex,
    handle,
    id,
    index,
    onRemove,
    style,
    renderItem,
    useDragOverlay,
    wrapperStyle,
}: SortableItemProps) {
    const {
        active,
        attributes,
        isDragging,
        isSorting,
        listeners,
        overIndex,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({
        id,
        animateLayoutChanges,
        disabled,
        getNewIndex,
    })

    return (
        <Item
            ref={setNodeRef}
            value={id}
            disabled={disabled}
            dragging={isDragging}
            sorting={isSorting}
            handle={handle}
            handleProps={
                handle
                    ? {
                          ref: setActivatorNodeRef,
                      }
                    : undefined
            }
            renderItem={renderItem}
            index={index}
            style={style({
                index,
                id,
                isDragging,
                isSorting,
                overIndex,
            })}
            onRemove={onRemove ? () => onRemove(id) : undefined}
            transform={transform}
            transition={transition}
            wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
            listeners={listeners}
            data-index={index}
            data-id={id}
            dragOverlay={!useDragOverlay && isDragging}
            {...attributes}
        />
    )
}
