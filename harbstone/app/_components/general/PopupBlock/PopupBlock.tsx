'use client';

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import RequestForm from "../../sections/RequestBlock/RequestForm";
import { requestInputs, requestPricing } from "@/app/_data/requestForm";
import useBodyScrollLock from "@/app/_hooks/useBodyScrollLock";
import styles from './PopupBlock.module.scss';

export default function PopupBlock() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    useBodyScrollLock(isOpen);

    useEffect(() => {
        const animationFrame = requestAnimationFrame(() => {
            setIsOpen(false);
        });

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [pathname]);

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            const target = event.target instanceof Element
                ? event.target.closest('[data-popup-open="request"]')
                : null;

            if (!target) {
                return;
            }

            event.preventDefault();
            setIsOpen(true);
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            className={`${styles.popup} ${isOpen ? styles['popup--open'] : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-popup-title"
            aria-hidden={!isOpen}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    setIsOpen(false);
                }
            }}
        >
            <div className={styles.popup__content}>
                <div className={styles.popup__header}>
                    <h3
                        id="request-popup-title"
                        className="heading heading--font-1 heading--medium heading--dark-color"
                    >
                        Have an idea? We can help!
                    </h3>
                    <button
                        type="button"
                        className={styles.popup__close}
                        aria-label="Close request form"
                        onClick={() => setIsOpen(false)}
                    >
                        <X />
                    </button>
                </div>
                <RequestForm
                    inputs={requestInputs}
                    pricing={requestPricing}
                    variant="popup"
                />
            </div>
        </div>
    )
}
