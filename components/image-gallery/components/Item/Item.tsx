/* eslint-disable @next/next/no-img-element */
'use client'

/* eslint-disable no-unused-vars */
import React, { ChangeEvent, useEffect } from 'react'
import classNames from 'classnames'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import type { Transform } from '@dnd-kit/utilities'

import styles from './Item.module.scss'
import { useGalleryContext } from '@/app/provider/context-provider'
import Image from 'next/image'

export interface Props {
    dragOverlay?: boolean
    color?: string
    disabled?: boolean
    dragging?: boolean
    handle?: boolean
    handleProps?: any
    height?: number
    index?: number
    fadeIn?: boolean
    transform?: Transform | null
    listeners?: DraggableSyntheticListeners
    sorting?: boolean
    style?: React.CSSProperties
    transition?: string | null
    wrapperStyle?: React.CSSProperties
    value: React.ReactNode | string
    onRemove?(): void
    renderItem?(args: {
        dragOverlay: boolean
        dragging: boolean
        sorting: boolean
        index: number | undefined
        fadeIn: boolean
        listeners: DraggableSyntheticListeners
        ref: React.Ref<HTMLElement>
        style: React.CSSProperties | undefined
        transform: Props['transform']
        transition: Props['transition']
        value: Props['value']
    }): React.ReactElement
}

export const Item = React.memo(
    React.forwardRef<HTMLLIElement, Props>(
        (
            {
                color,
                dragOverlay,
                dragging,
                disabled,
                fadeIn,
                handle,
                handleProps,
                height,
                index,
                listeners,
                onRemove,
                renderItem,
                sorting,
                style,
                transition,
                transform,
                value,
                wrapperStyle,
                ...props
            },
            ref
        ) => {
            const { checkedImage, removeCheckedImage, addCheckedImage } =
                useGalleryContext()

            const isExists = checkedImage.includes(value as string)

            useEffect(() => {
                if (!dragOverlay) {
                    return
                }

                document.body.style.cursor = 'grabbing'

                return () => {
                    document.body.style.cursor = ''
                }
            }, [dragOverlay])

            const addRemoveToChecked = (
                e: ChangeEvent<HTMLInputElement>,
                url: string
            ) => {
                if (e.target.checked) {
                    addCheckedImage(url)
                } else {
                    removeCheckedImage(url)
                }
            }

            return renderItem ? (
                renderItem({
                    dragOverlay: Boolean(dragOverlay),
                    dragging: Boolean(dragging),
                    sorting: Boolean(sorting),
                    index,
                    fadeIn: Boolean(fadeIn),
                    listeners,
                    ref,
                    style,
                    transform,
                    transition,
                    value,
                })
            ) : (
                <li
                    className={classNames(
                        styles.Wrapper,
                        fadeIn && styles.fadeIn,
                        sorting && styles.sorting,
                        dragOverlay && styles.dragOverlay,
                        'w-1/1 aspect-[1/1] relative group'
                    )}
                    style={
                        {
                            ...wrapperStyle,
                            transition: [transition, wrapperStyle?.transition]
                                .filter(Boolean)
                                .join(', '),
                            '--translate-x': transform
                                ? `${Math.round(transform.x)}px`
                                : undefined,
                            '--translate-y': transform
                                ? `${Math.round(transform.y)}px`
                                : undefined,
                            '--scale-x': transform?.scaleX
                                ? `${transform.scaleX}`
                                : undefined,
                            '--scale-y': transform?.scaleY
                                ? `${transform.scaleY}`
                                : undefined,
                            '--index': index,
                            '--color': color,
                        } as React.CSSProperties
                    }
                    ref={ref}
                >
                    <div
                        className={classNames(
                            styles.Item,
                            dragging && styles.dragging,
                            handle && styles.withHandle,
                            dragOverlay && styles.dragOverlay,
                            disabled && styles.disabled,
                            color && styles.color,
                            'relative '
                        )}
                        style={style}
                        {...(!handle ? listeners : undefined)}
                        {...props}
                        tabIndex={!handle ? 0 : undefined}
                    >
                        <div
                            className={classNames(
                                'left-0 top-0 absolute z-50 w-full h-full bg-opacity-0 group-hover:bg-opacity-30 bg-zinc-400 transition-all ',
                                isExists && 'bg-opacity-10'
                            )}
                        ></div>

                        {/* <Image
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                            src={value as string}
                            alt=""
                        /> */}
                        <img
                            src={value as string}
                            className="w-full h-full object-cover"
                            alt=""
                        />
                    </div>

                    <input
                        className={classNames(
                            'left-3 top-3 absolute z-50 w-4 h-4 group-hover:block',
                            !isExists && 'hidden'
                        )}
                        type="checkbox"
                        name=""
                        id={value + '1'}
                        onChange={(e) => addRemoveToChecked(e, value as string)}
                        checked={isExists}
                    />
                </li>
            )
        }
    )
)
