import Link from "next/link";
import BlockTitle from "../../general/block/BlockTitle/BlockTitle";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import Breadcrumbs from "../../general/Breadcrumbs/Breadcrumbs";
import styles from './ContactsBlock.module.scss';
import Button from "../../general/Button/Button";
import { ArrowUpRight } from "lucide-react";
interface ContactsBlockProps {
    title: string;
    breadcrumbs: {
        label: string;
        href?: string;
    }[];
    numbers?: {
        number: string;
    }[];
    email: string;
    social: {
        label: string;
        href: string;
    }[];
    address: string;
    cart: string
}


export default function ContactsBlock({
    numbers,
    email,
    social,
    address,
    cart,
    title,
    breadcrumbs
}: ContactsBlockProps) {
    return (
        <BlockWrapper background="white" padding="pb" number={true}>
            <Breadcrumbs
                breadcrumbs={breadcrumbs}
                type="dark"
            />
            <div className="block__header block__header--pb">
                <BlockTitle title={title} />
            </div>
            <div className={styles.contacts}>
                <div className={styles.contacts__body}>
                    <div className={styles.contacts__content}>
                        <div className={styles['get-in-touch']}>
                            <div className={styles['get-in-touch__block']}>
                                <div className={styles['get-in-touch__item']}>
                                    <p
                                        className={`${styles['get-in-touch__label']} text text--medium text--dark-color text--weight-400`}
                                    >
                                        Work mail:
                                    </p>
                                    <Link
                                        href={`mailto:${email}`}
                                        className={`${styles['get-in-touch__link']} ${styles['get-in-touch__link--mail']} text text--medium text--dark-color text--weight-400`}
                                    >
                                        {email}
                                    </Link>
                                </div>
                                <div className={styles['get-in-touch__item']}>
                                    <p
                                        className={`${styles['get-in-touch__label']} text text--medium text--dark-color text--weight-400`}
                                    >
                                        Numbers:
                                    </p>
                                    {numbers?.map((item) => (
                                        <Link
                                            key={item.number}
                                            href={`tel:${item.number}`}
                                            className={`${styles['get-in-touch__link']} text text--medium text--dark-color text--weight-400`}
                                        >
                                            {item.number}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className={styles['get-in-touch__block']}>
                                <div className={styles['get-in-touch__item']}>
                                    <p
                                        className={`${styles['get-in-touch__label']} text text--medium text--dark-color text--weight-400`}
                                    >
                                        Socials:
                                    </p>
                                    {social.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            target={item.href.startsWith('http') ? '_blank' : undefined}
                                            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                                            className={`${styles['get-in-touch__link']} text text--medium text--dark-color text--weight-400`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Button size="large" color="white" background="dark" data-popup-open="request">
                            <ArrowUpRight/>
                            Start Your Project
                        </Button>
                    </div>

                    <div className={styles.contacts__location}>
                        <div className={styles['get-in-touch__item']}>
                            <span
                                className={`${styles['get-in-touch__label']} text text--medium text--dark-color text--weight-400`}
                            >
                                Address:
                            </span>

                            <Link
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                                target="_blank"
                                rel="noreferrer"
                                className={`${styles['get-in-touch__link']} text text--medium text--dark-color text--weight-500`}
                            >
                                {address}
                            </Link>
                        </div>

                        <iframe
                            className={styles.contacts__iframe}
                            src={cart}
                        ></iframe>
                    </div>
                </div>
            </div>
        </BlockWrapper>
    )
}
