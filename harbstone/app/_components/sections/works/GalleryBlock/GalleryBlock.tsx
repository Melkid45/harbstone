'use client';

import { useRef } from "react";
import BlockWrapper from "@/app/_components/general/block/BlockWrapper/BlockWrapper";
import Image, { StaticImageData } from "next/image";

interface GalleryBlockProps {
    gallery: {
        image: StaticImageData | string;
        alt?: string;
    }[];
    coeff?: number;
}


export default function GalleryBlock({
    gallery,
    coeff = 400
}: GalleryBlockProps) {
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const wrapperRefs = useRef<Array<HTMLElement | null>>([]);

    const updateItemGeometry = (index: number, image: HTMLImageElement) => {
        const item = itemRefs.current[index];
        const wrapper = wrapperRefs.current[index];

        if (!item || !wrapper || !image.naturalWidth || !image.naturalHeight) {
            return;
        }

        const aspectRatio = image.naturalWidth / image.naturalHeight;

        wrapper.style.paddingBottom = `${100 / aspectRatio}%`;
        item.style.width = `${aspectRatio * coeff}px`;
        item.style.flexGrow = `${aspectRatio * coeff}`;
    };

    return (
        <BlockWrapper background="white" padding="pt">
            <div className="block__gallery block__gallery--table" data-coeff={coeff}>
                {gallery.map((item, index) => (
                    <div
                        key={index}
                        ref={(node) => {
                            itemRefs.current[index] = node;
                        }}
                        className="block__gallery-item"
                    >
                        <i
                            ref={(node) => {
                                wrapperRefs.current[index] = node;
                            }}
                        >
                            <Image
                                src={item.image}
                                alt={item.alt || `Gallery item ${index + 1}`}
                                fill
                                sizes="(max-width: 660px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onLoad={(event) => updateItemGeometry(index, event.currentTarget)}
                            />
                        </i>
                    </div>
                ))}
            </div>
        </BlockWrapper>
    )
}
