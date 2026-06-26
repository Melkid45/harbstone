'use client';

import { ArrowUpRight, TextAlignJustify, X } from "lucide-react";
import Image from "next/image";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Logo from '@/app/assets/images/logo.svg';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import styles from './Header.module.scss';
import Container from "../Container/Container";
import Button from "../Button/Button";
import gsap from "gsap";
import useBodyScrollLock from "@/app/_hooks/useBodyScrollLock";
import { locales } from "@/app/_i18n/config";
import { useI18n } from "@/app/_i18n/LocaleProvider";

interface HeaderProps {
    navigation?: NavigationArray[];
    email?: string;
    numbers?: NumbersArray[];
    social?: SocialArray[];
    language?: LanguageItem[];
}


interface NavigationArray {
    label: string;
    href?: string;
    children?: {
        label: string;
        href?: string;
    }[];
}

interface NumbersArray {
    number: string;
}
interface SocialArray {
    label: string;
    href?: string;
}
interface LanguageItem {
    name: string;
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
export default function Header({
    navigation,
    email = emailMain,
    numbers = numbersMain,
    social = socialMain,
    language
}: HeaderProps) {
    const {
        locale,
        localeHref,
        localizedHref,
        selectLocale,
        translations: t,
    } = useI18n();
    const localizedNavigation: NavigationArray[] = navigation || [
        { label: t.nav.works, href: '/works' },
        {
            label: t.nav.services,
            children: [
                { label: t.nav.webDev, href: '/services/web-dev' },
                { label: t.nav.videoProduction, href: '/services/video-production' },
                { label: t.nav.contentPromotion, href: '/services/viral-promotion' },
            ],
        },
        { label: t.nav.about, href: '/about' },
        { label: t.nav.euProjects, href: '/eu-project' },
        { label: t.nav.contacts, href: '/contact' },
    ];
    const localizedLanguages = language || locales
        .filter((item) => item !== locale)
        .map((item) => ({ name: item.toUpperCase() }));
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const lenis = useLenis();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    useBodyScrollLock(isOpen);
    const languageListWidth = `${localizedLanguages.length * 55 + Math.max(localizedLanguages.length - 1, 0) * 12}px`;
    const switchMenu = () => {
        setIsOpen((current) => !current);
    }
    const closeMenu = () => {
        setIsOpen(false);
    };
    const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        closeMenu();

        if (pathname !== '/') {
            return;
        }

        event.preventDefault();

        window.setTimeout(() => {
            lenis?.start();

            if (lenis) {
                lenis.scrollTo(0, {
                    duration: 0.9,
                    force: true,
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        }, 0);
    };

    useEffect(() => {
        const animationFrame = requestAnimationFrame(() => {
            setIsOpen(false);
        });

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [pathname]);

    useEffect(() => {
        const menu = menuRef.current;

        if (!menu) {
            return;
        }

        const navigationItems = gsap.utils.toArray<HTMLElement>(menu.querySelectorAll('[data-menu-item]'));
        const contactItems = gsap.utils.toArray<HTMLElement>(menu.querySelectorAll('[data-contact-item]'));
        const projectButton = menu.querySelector<HTMLElement>('[data-menu-button]');
        const projectButtonTargets = projectButton ? [projectButton] : [];
        const animatedTargets = [
            menu,
            ...navigationItems,
            ...contactItems,
            ...projectButtonTargets,
        ];

        timelineRef.current?.kill();
        gsap.killTweensOf(animatedTargets);

        if (isOpen) {
            const timeline = gsap.timeline({
                defaults: {
                    ease: 'power3.out',
                    overwrite: 'auto',
                },
            });

            timeline
                .set(menu, {
                    pointerEvents: 'auto',
                    opacity: 0,
                    visibility: 'visible',
                })
                .set(navigationItems, {
                    opacity: 0,
                    y: 34,
                })
                .set(contactItems, {
                    opacity: 0,
                })
                .set(projectButtonTargets, {
                    opacity: 0,
                    y: 18,
                })
                .to(menu, {
                    opacity: 1,
                    duration: 0.18,
                    ease: 'power1.out',
                })
                .to(navigationItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.42,
                    stagger: 0.04,
                }, '-=0.02')
                .to(contactItems, {
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.05,
                }, '-=0.42')
                .to(projectButtonTargets, {
                    opacity: 1,
                    y: 0,
                    duration: 0.34,
                }, '-=0.22');

            timelineRef.current = timeline;
        } else {
            const timeline = gsap.timeline({
                defaults: {
                    ease: 'power2.inOut',
                    overwrite: 'auto',
                },
            });

            timeline
                .to(projectButtonTargets, {
                    opacity: 0,
                    y: 14,
                    duration: 0.18,
                }, 0)
                .to(contactItems, {
                    opacity: 0,
                    duration: 0.18,
                    stagger: 0.025,
                }, 0)
                .to([...navigationItems].reverse(), {
                    opacity: 0,
                    y: 18,
                    duration: 0.2,
                    stagger: 0.018,
                }, 0.02)
                .to(menu, {
                    opacity: 0,
                    duration: 0.26,
                    ease: 'power1.out',
                }, 0.04)
                .set(menu, {
                    pointerEvents: 'none',
                    visibility: 'hidden',
                })
                .set(navigationItems, {
                    y: 34,
                })
                .set(projectButtonTargets, {
                    y: 18,
                });

            timelineRef.current = timeline;
        }

        return () => {
            timelineRef.current?.kill();
        };
    }, [isOpen]);

    return (
        <>
            <header className={styles.header}>
                <Container>
                    <div className={styles.header__body}>
                        <Link onClick={handleLogoClick} href={localizedHref('/')} className={styles.header__logo}>
                            <Image loading="eager" src={Logo} alt="" />
                        </Link>
                        <div className={styles.header__action}>
                            <div
                                className={styles.header__language}
                                style={{ '--language-list-width': languageListWidth } as CSSProperties}
                                aria-label={t.common.selectLanguage}
                                tabIndex={0}
                            >
                                <div className={styles['header__language-all']}>
                                    {localizedLanguages.map((item) => (
                                        <Link
                                            key={item.name}
                                            className='text text--small text--white-color'
                                            href={localeHref(item.name.toLowerCase() as 'en' | 'lv' | 'ru')}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                const nextLocale = item.name.toLowerCase() as 'en' | 'lv' | 'ru';
                                                const href = localeHref(nextLocale);
                                                selectLocale(nextLocale);
                                                closeMenu();
                                                router.replace(href, { scroll: false });
                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className={`${styles['header__language-main']} text text--small text--dark-color`}>
                                    {locale.toUpperCase()}
                                </div>
                            </div>
                            <button
                                type="button"
                                className={`${styles['header-menu-open']} ${isOpen ? styles['header-menu-open--opened'] : ''}`}
                                onClick={switchMenu}
                                aria-expanded={isOpen}
                                aria-controls="main-menu"
                                aria-label={isOpen ? t.common.closeMenu : t.common.openMenu}
                            >
                                <TextAlignJustify className={styles['header-menu-open__burger']} />
                                <X className={styles['header-menu-open__close']} />
                            </button>
                        </div>
                    </div>
                </Container>
            </header>
            <div id="main-menu" ref={menuRef} className={styles['main-menu']}>
                <Container customClass={styles['main-menu__container']}>
                    <div className={styles['main-menu__container']}>
                        <div className={styles['main-menu__content']}>
                            <div className={styles['main-menu__navigation']}>
                                <nav>
                                    {localizedNavigation.map((item) => (
                                        item.children ? (
                                            <React.Fragment key={item.label}>
                                                <Link href={localizedHref(item.href ? item.href : '/services')} onClick={closeMenu} className="heading heading--font-1 heading--standard heading--dark-color" data-menu-item>
                                                    {item.label}
                                                </Link>
                                                <div>
                                                    {item.children.map((child) => (
                                                        <Link key={child.label} href={localizedHref(child.href ? child.href : '/services')} onClick={closeMenu} className="text text--standard text--dark-color text--weight-400" data-menu-item>
                                                            <span>{child.label}</span>
                                                            <ArrowUpRight />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </React.Fragment>
                                        ) : (
                                            <Link key={item.label} href={localizedHref(item.href ? item.href : '/')} onClick={closeMenu} className="heading heading--font-1 heading--standard heading--dark-color" data-menu-item>
                                                {item.label}
                                            </Link>
                                        )
                                    ))}
                                </nav>
                                <div className={styles['main-menu__button']} data-menu-button>
                                    <Button
                                        full="full"
                                        background="dark"
                                        size="large"
                                        color="white"
                                        data-popup-open="request"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <ArrowUpRight />
                                        {t.common.startProject}
                                    </Button>
                                </div>
                            </div>

                            <div className={styles['get-in-touch']}>
                                <div className={styles['get-in-touch__block']}>
                                    <div className={styles['get-in-touch__item']} data-contact-item>
                                        <p
                                            className={`${styles['get-in-touch__label']} text text--medium text--dark-color text--weight-400`}
                                        >
                                            {t.common.workMail}
                                        </p>
                                        {email && (
                                            <Link
                                                href={`mailto:${email}`}
                                                onClick={closeMenu}
                                                className={`${styles['get-in-touch__link']} ${styles['get-in-touch__link--mail']} text text--medium text--dark-color text--weight-400`}
                                            >
                                                {email}
                                            </Link>
                                        )}
                                    </div>
                                    <div className={styles['get-in-touch__item']} data-contact-item>
                                        <p
                                            className={`${styles['get-in-touch__label']} text text--medium text--dark-color text--weight-400`}
                                        >
                                            {t.common.numbers}
                                        </p>
                                        {numbers.map((item) => (
                                            <Link
                                                key={item.number}
                                                href={`tel:${item.number}`}
                                                onClick={closeMenu}
                                                className={`${styles['get-in-touch__link']} text text--medium text--dark-color text--weight-400`}
                                            >
                                                {item.number}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles['get-in-touch__block']}>
                                    <div className={styles['get-in-touch__item']} data-contact-item>
                                        <p
                                            className={`${styles['get-in-touch__label']} text text--medium text--dark-color text--weight-400`}
                                        >
                                            {t.common.socials}
                                        </p>
                                        {social.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href ? item.href : '/'}
                                                target={item.href?.startsWith('http') ? '_blank' : undefined}
                                                rel={item.href?.startsWith('http') ? 'noreferrer' : undefined}
                                                onClick={closeMenu}
                                                className={`${styles['get-in-touch__link']} text text--medium text--dark-color text--weight-400`}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container >
            </div >
        </>


    )
}
