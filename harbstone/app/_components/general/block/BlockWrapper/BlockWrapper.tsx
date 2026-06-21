import { ReactNode } from "react";
import styles from './BlockWrapper.module.scss';
import Container from "../../Container/Container";
interface BlockWrapperProps {
    children: string | ReactNode;
    isContainer?: boolean;
    padding?: 'pt' | 'pb' | 'y' | 'none';
    size?: 'narrow'
    background?: 'white' | 'dark' | 'dark-deep';
    overflow?: 'hidden' | 'visible';
    number?: boolean;
}

export default function BlockWrapper({
    children,
    isContainer = true,
    padding = 'pt',
    size,
    background = 'white',
    overflow = 'hidden',
    number = false
}: BlockWrapperProps) {
    return (
        <section className={`
            ${styles.block}
            ${padding ? styles[`block--${padding}`] : ''}
            ${size ? styles[`block--${size}`] : ''}
            ${styles[`block--${background}`]}
            ${styles[`block--overflow-${overflow}`]}
            ${number ? styles[`block--first`] : ''}
        `}>
            {isContainer ? (
                <Container>
                    {children}
                </Container>
            ) : (
                children
            )}
        </section>
    )
}
