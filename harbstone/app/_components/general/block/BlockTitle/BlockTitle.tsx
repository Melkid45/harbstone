import { ReactNode } from "react";
import styles from './BlockTitle.module.scss';

interface BlockTitleProps {
    title: string | ReactNode;
    description?: string;
    type?: 'default' | 'white';
}


export default function BlockTitle({
    title,
    description,
    type = 'default'
}: BlockTitleProps) {
    return (
        <div className={styles.block__title}>
            <h3
                className={`heading heading--font-1 heading--large ${type=='white' ? 'heading--white-color' : 'heading--dark-color'}`}
            >
                {title}
            </h3>
            {description && (
                <p className="text text--medium text--dark-color text--mw">
                    {description}
                </p>
            )}
        </div>
    )
}