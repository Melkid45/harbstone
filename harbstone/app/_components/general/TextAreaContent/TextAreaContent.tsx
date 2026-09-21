import { Fragment } from "react";
import styles from './TextAreaContent.module.scss';

interface TextAreaContentProps {
    value?: string | null;
    className?: string;
}

const getParagraphs = (value: string) => (
    value
        .replace(/\r\n?/g, '\n')
        .split(/\n[\t ]*\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
);

const renderLines = (paragraph: string) => (
    paragraph.split('\n').map((line, index, lines) => (
        <Fragment key={`${line}-${index}`}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
        </Fragment>
    ))
);

export default function TextAreaContent({
    value,
    className,
}: TextAreaContentProps) {
    if (!value) {
        return null;
    }

    const paragraphs = getParagraphs(value);

    if (!paragraphs.length) {
        return null;
    }

    if (paragraphs.length === 1) {
        return (
            <p className={className}>
                {renderLines(paragraphs[0])}
            </p>
        );
    }

    return (
        <div className={className}>
            {paragraphs.map((paragraph, index) => (
                <p key={`${paragraph}-${index}`} className={styles.paragraph}>
                    {renderLines(paragraph)}
                </p>
            ))}
        </div>
    );
}
