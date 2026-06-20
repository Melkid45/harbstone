import { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import styles from './Button.module.scss';
import Link from "next/link";

interface ButtonStyleProps {
    children: string | ReactNode;
    background?: 'transparent' | 'gradient' | 'white' | 'light' | 'dark';
    border?: 'white' | 'light' | 'dark';
    color?: 'white' | 'light' | 'dark';
    place?: 'centered';
    size?: 'medium' | 'large';
    full?: 'full';
    isLink?: boolean;
    href?: string;
    customClass?: string;
}

type ButtonProps = ButtonStyleProps & (
    | ({ isLink: true; href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'href'>)
    | ({ isLink?: false; href?: string } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>)
);

function AnimatedButtonText({ text }: { text: string }) {
    const chars = Array.from(text);

    return (
        <span className={styles.button__label} aria-hidden="true">
            <span className={styles.button__line}>
                {chars.map((char, index) => (
                    <span
                        key={`${char}-${index}-current`}
                        className={`${styles.button__char} ${char === ' ' ? styles.button__space : ''}`}
                        style={{ '--char-index': index } as CSSProperties}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </span>
            <span className={`${styles.button__line} ${styles['button__line--next']}`}>
                {chars.map((char, index) => (
                    <span
                        key={`${char}-${index}-next`}
                        className={`${styles.button__char} ${char === ' ' ? styles.button__space : ''}`}
                        style={{ '--char-index': index } as CSSProperties}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </span>
        </span>
    );
}

function getButtonText(children: ReactNode) {
    if (Array.isArray(children)) {
        return children
            .filter((child) => typeof child === 'string' || typeof child === 'number')
            .map((child) => String(child).replace(/\s+/g, ' ').trim())
            .filter(Boolean)
            .join(' ');
    }

    if (typeof children === 'string' || typeof children === 'number') {
        return String(children).replace(/\s+/g, ' ').trim();
    }

    return '';
}

function renderButtonChildren(children: ReactNode) {
    if (Array.isArray(children)) {
        return children.map((child, index) => {
            if (typeof child === 'string' || typeof child === 'number') {
                const text = String(child).replace(/\s+/g, ' ').trim();

                return text ? <AnimatedButtonText key={`text-${index}`} text={text} /> : child;
            }

            return child;
        });
    }

    if (typeof children === 'string' || typeof children === 'number') {
        return <AnimatedButtonText text={String(children).replace(/\s+/g, ' ').trim()} />;
    }

    return children;
}

export default function Button({
    children,
    background = 'dark',
    border = 'light',
    color = 'white',
    place,
    size = 'medium',
    full,
    isLink = false,
    href,
    customClass,
    ...props
}: ButtonProps) {
    const buttonText = getButtonText(children);
    const accessibilityProps = buttonText && !props['aria-label'] ? { 'aria-label': buttonText } : {};

    return (
        isLink ? (
            <Link href={href ? href : ''} className={`
            ${styles.button}
            ${background ? styles[`button--${background}`]: ''}
            ${size ? styles[`button--${size}`] : ''}
            ${border ? styles[`button--${border}-border`] : ''}
            ${color ? styles[`button--${color}-color`] : ''}
            ${place ? styles[`button--${place}`] : ''}
            ${full ? styles[`button--${full}`] : ''}
            ${customClass ? customClass : ''}
        `} {...accessibilityProps} {...props as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'href'>}>
                {renderButtonChildren(children)}
            </Link>
        ) : (
            <button className={`
            ${styles.button}
            ${styles[`button--${background}`]}
            ${styles[`button--${size}`]}
            ${styles[`button--${border}-border`]}
            ${styles[`button--${color}-color`]}
            ${styles[`button--${place}`]}
            ${styles[`button--${full}`]}
            ${customClass ? customClass : ''}
        `} {...accessibilityProps} {...props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>}>
                {renderButtonChildren(children)}
            </button>
        )

    )
}
