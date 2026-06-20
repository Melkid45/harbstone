import { ReactNode } from "react";
import styles from './Container.module.scss';
interface ContainerProps {
    children: ReactNode;
    customClass?: string;
}


export default function Container({children, customClass}:ContainerProps) {
    return (
        <div className={`${customClass ? customClass : ''} ${styles.container}`}>
            {children}
        </div>
    )
}