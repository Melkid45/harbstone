'use client';

import Link from "next/link";
import BlockWrapper from "../block/BlockWrapper/BlockWrapper";
import Logo from '@/app/assets/images/logo.svg';
import Image from "next/image";
import styles from './Footer.module.scss';
import Container from "../Container/Container";
import { useI18n } from "@/app/_i18n/LocaleProvider";
interface FooterProps {
    email?: string;
    numbers?: NumbersArray[];
    social?: SocialArray[];
    navigation?: NavigationArray[];
    categories?: FooterNavigationGroup[];
}

export interface FooterNavigationGroup {
    label: string;
    children?: {
        label: string;
        href?: string;
    }[];
}

type NavigationArray = FooterNavigationGroup;

interface NumbersArray {
    number: string;
}
interface SocialArray {
    label: string;
    href?: string;
}


const emailMain: string = 'hello@harbstone.digital';


const numbersMain: NumbersArray[] = [
    {
        number: '+371 22-400-200'
    },
    {
        number: '+371 22-400-300'
    },
]
const socialMain: SocialArray[] = [
    {
        label: 'X (Twitter)',
        href: 'https://x.com'
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com'
    },
    {
        label: 'Vimeo',
        href: 'https://vimeo.com'
    },
]

const navigationMain = [
    {
        label: 'Web Dev',
        children: [
            {
                label: 'Web design & UX',
                href: '/works?service=web-dev&soft=web-design-and-ux'
            },
            {
                label: 'Programming',
                href: '/works?service=web-dev&soft=programming'
            },
            {
                label: 'SEO / SAO',
                href: '/works?service=web-dev&soft=seo-sao'
            },
        ]
    },
    {
        label: 'Video Production',
        children: [
            {
                label: 'Pre-production',
                href: '/works?service=video-production&soft=pre-production'
            },
            {
                label: 'Production',
                href: '/works?service=video-production&soft=production'
            },
            {
                label: 'Post-production',
                href: '/works?service=video-production&soft=post-production'
            },
        ]
    },
    {
        label: 'Company',
        children: [
            {
                label: 'About Us',
                href: '/about'
            },
            {
                label: 'Services',
                href: '/services'
            },
            {
                label: 'Works',
                href: '/works'
            },
            {
                label: 'EU Projects',
                href: '/eu-project'
            },
            {
                label: 'Contacts',
                href: '/contact'
            },
        ]
    },
]

export default function Footer({
    social = socialMain,
    email = emailMain,
    numbers = numbersMain,
    navigation,
    categories,
}: FooterProps) {
    const { localizedHref, translations: t } = useI18n();
    const serviceCategories = categories?.length
        ? categories
        : [navigationMain[0], navigationMain[1]];
    const localizedNavigation = navigation || [
        ...serviceCategories,
        {
            label: t.nav.company,
            children: [
                { label: t.nav.about, href: '/about' },
                { label: t.nav.services, href: '/services' },
                { label: t.nav.works, href: '/works' },
                { label: t.nav.euProjects, href: '/eu-project' },
                { label: t.nav.contacts, href: '/contact' },
            ],
        },
    ];
    return (
        <footer>
            <BlockWrapper padding="pb" background="dark">
                <div className={styles['footer-main']}>
                    <div className={styles['footer-main__body']}>
                        <div className={styles['footer-main__content']}>
                            <Link className={styles.logo} href={localizedHref('/')}>
                                <Image src={Logo} alt="Footer Logo" />
                            </Link>
                            <div className={styles['footer-main__policy']}>
                                <Link href={localizedHref('/privacy-policy')} className="text text--small text--white-color">
                                    {t.common.privacyPolicy}
                                </Link>
                                <p className="text text--small text--white-color">
                                    © 2016-2026 Harbstone Digital SIA.
                                </p>
                            </div>
                        </div>
                        <div className={styles['get-in-touch']}>
                            <div className={styles['get-in-touch__block']}>
                                <div className={styles['get-in-touch__item']} data-contact-item>
                                    <p
                                        className={`${styles['get-in-touch__label']} text text--medium text--white-color text--weight-400`}
                                    >
                                        {t.common.workMail}
                                    </p>
                                    {email && (
                                        <Link
                                            href={`mailto:${email}`}
                                            className={`${styles['get-in-touch__link']} ${styles['get-in-touch__link--mail']} text text--medium text--white-color text--weight-400`}
                                        >
                                            {email}
                                        </Link>
                                    )}
                                </div>
                                <div className={styles['get-in-touch__item']} data-contact-item>
                                    <p
                                        className={`${styles['get-in-touch__label']} text text--medium text--white-color text--weight-400`}
                                    >
                                        {t.common.numbers}
                                    </p>
                                    {numbers.map((item) => (
                                        <Link
                                            key={item.number}
                                            href={`tel:${item.number}`}
                                            className={`${styles['get-in-touch__link']} text text--medium text--white-color text--weight-400`}
                                        >
                                            {item.number}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className={styles['get-in-touch__block']}>
                                <div className={styles['get-in-touch__item']} data-contact-item>
                                    <p
                                        className={`${styles['get-in-touch__label']} text text--medium text--white-color text--weight-400`}
                                    >
                                        {t.common.socials}
                                    </p>
                                    {social.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={localizedHref(item.href ? item.href : '/')}
                                            target={item.href?.startsWith('http') ? '_blank' : undefined}
                                            rel={item.href?.startsWith('http') ? 'noreferrer' : undefined}
                                            className={`${styles['get-in-touch__link']} text text--medium text--white-color text--weight-400`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BlockWrapper>
            <section className={styles['footer-nav']}>
                <Container>
                    <div className={styles['footer-nav__body']}>
                        {localizedNavigation.map((item) => (
                            <div key={item.label} className={styles['footer-nav__group']}>
                                <h3
                                    className={`${styles['footer-nav__title']} text text--medium text--white-color`}
                                >
                                    {item.label}
                                </h3>
                                <div className={styles['footer-nav__links']}>
                                    {item.children?.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={localizedHref(item.href ? item.href : '/')}
                                            className={`${styles['footer-nav__link']} text text--small text--white-color`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </footer>
    )
}
