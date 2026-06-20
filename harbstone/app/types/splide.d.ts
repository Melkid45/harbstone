declare module '@splidejs/react-splide' {
    import type { Options } from '@splidejs/splide';
    import type { Component, FC, HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react';

    export interface SplideProps extends HTMLAttributes<HTMLElement> {
        children?: ReactNode;
        hasTrack?: boolean;
        options?: Options;
        tag?: 'div' | 'section' | 'header' | 'footer' | 'nav';
    }

    export class Splide extends Component<SplideProps> {
        go(control: number | string): void;
    }

    export const SplideSlide: FC<LiHTMLAttributes<HTMLLIElement>>;
    export type { Options };
}
