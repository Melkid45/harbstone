'use client';

import { ArrowUpRight, TextAlignJustify, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Logo from '@/app/assets/images/logo.svg';
import Link from "next/link";
import styles from './Header.module.scss';
import Container from "../Container/Container";
import Button from "../Button/Button";
import gsap from "gsap";

interface HeaderProps {
    navigation?: NavigationArray[];
    email?: string;
    numbers?: NumbersArray[];
    social?: SocialArray[];
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

const NavigationMenu: NavigationArray[] = [
    {
        label: 'Works',
        href: '/works'
    },
    {
        label: 'Services',
        children: [
            {
                label: 'Web Dev',
                href: ''
            },
            {
                label: 'Video Production',
                href: ''
            },
            {
                label: 'Content & Promotion',
                href: ''
            },
        ]
    },
    {
        label: 'About Us',
        href: '/about'
    },
    {
        label: 'EU projects',
        href: '/eu-project'
    },
    {
        label: 'Contacts',
        href: '/contacts'
    },
]

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
        href: '#'
    },
    {
        label: 'Instagram',
        href: '#'
    },
    {
        label: 'Vimeo',
        href: '#'
    },
]

export default function Header({
    navigation = NavigationMenu,
    email = emailMain,
    numbers = numbersMain,
    social = socialMain
}: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const switchMenu = () => {
        setIsOpen((current) => !current);
    }
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
                        <Link href="/" className={styles.header__logo}>
                            <Image loading="eager" src={Logo} alt="" />
                        </Link>
                        <button
                            type="button"
                            className={`${styles['header-menu-open']} ${isOpen ? styles['header-menu-open--opened'] : ''}`}
                            onClick={switchMenu}
                            aria-expanded={isOpen}
                            aria-controls="main-menu"
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        >
                            <TextAlignJustify className={styles['header-menu-open__burger']} />
                            <X className={styles['header-menu-open__close']} />
                        </button>
                    </div>
                </Container>
            </header>
            <div id="main-menu" ref={menuRef} className={styles['main-menu']}>
                <Container customClass={styles['main-menu__container']}>
                    <div className={styles['main-menu__container']}>
                        <div className={styles['main-menu__content']}>
                            <div className={styles['main-menu__navigation']}>
                                <nav>
                                    {navigation.map((item) => (
                                        item.children ? (
                                            <React.Fragment key={item.label}>
                                                <Link href={item.href ? item.href : ''} className="heading heading--font-1 heading--standard heading--dark-color" data-menu-item>
                                                    {item.label}
                                                </Link>
                                                <div>
                                                    {item.children.map((child) => (
                                                        <Link key={child.label} href={child.href ? child.href : ''} className="text text--standard text--dark-color text--weight-400" data-menu-item>
                                                            <span>{child.label}</span>
                                                            <ArrowUpRight />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </React.Fragment>
                                        ) : (
                                            <Link key={item.label} href={item.href ? item.href : ''} className="heading heading--font-1 heading--standard heading--dark-color" data-menu-item>
                                                {item.label}
                                            </Link>
                                        )
                                    ))}
                                </nav>
                                <div className={styles['main-menu__button']} data-menu-button>
                                    <Button full="full" background="dark" size="large" color="white">
                                        <ArrowUpRight />
                                        Start Your Project
                                    </Button>
                                </div>
                            </div>

                            <div className={styles['get-in-touch']}>
                                <div className={styles['get-in-touch__block']}>
                                    <div className={styles['get-in-touch__item']} data-contact-item>
                                        <p
                                            className={`${styles['get-in-touch__label']} text text--medium text--dark-color text--weight-400`}
                                        >
                                            Work mail:
                                        </p>
                                        {email && (
                                            <Link
                                                href={`mailto:${email}`}
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
                                            Numbers:
                                        </p>
                                        {numbers.map((item) => (
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
                                    <div className={styles['get-in-touch__item']} data-contact-item>
                                        <p
                                            className={`${styles['get-in-touch__label']} text text--medium text--dark-color text--weight-400`}
                                        >
                                            Socials:
                                        </p>
                                        {social.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href ? item.href : ''}
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
