import { ReactNode } from "react";
import styles from './BlockTitle.module.scss';

interface BlockTitleProps {
    title: string | ReactNode;
    description?: string;
    type?: 'default' | 'white';
    full?: boolean;
    size?: 'large' | 'medium';
}


export default function BlockTitle({
    title,
    description,
    type = 'default',
    full = false,
    size = 'large'
}: BlockTitleProps) {
    return (
        <div className={styles.block__title}>
            <h3
                className={`heading heading--font-1 heading--${size} ${type=='white' ? 'heading--white-color' : 'heading--dark-color'}`}
            >
                {title}
            </h3>
            {description && (
                <p className={`text text--medium ${type=='white' ? 'text--white-color' : 'text--dark-color'} ${!full && 'text--mw'}`}>
                    {description}
                </p>
            )}
        </div>
    )
}