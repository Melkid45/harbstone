'use client';

import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { usePathname } from "next/navigation";
import {
    defaultLocale,
    getTranslations,
    normalizeLocale,
    type Locale,
    type Translations,
} from "./config";

interface LocaleContextValue {
    locale: Locale;
    translations: Translations;
    localeHref: (locale: Locale) => string;
    localizedHref: (href: string) => string;
    selectLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
    locale: defaultLocale,
    translations: getTranslations(defaultLocale),
    localeHref: () => '/',
    localizedHref: (href) => href,
    selectLocale: () => undefined,
});

const addLocaleToHref = (href: string, locale: Locale) => {
    if (!href.startsWith('/') || href.startsWith('//')) {
        return href;
    }

    const url = new URL(href, 'https://harbstone.local');
    url.searchParams.set('locale', locale);

    return `${url.pathname}${url.search}${url.hash}`;
};

const getCookieLocale = () => {
    const value = document.cookie
        .split('; ')
        .find((item) => item.startsWith('locale='))
        ?.split('=')[1];

    return normalizeLocale(value);
};

export default function LocaleProvider({
    children,
    initialLocale,
}: {
    children: ReactNode;
    initialLocale: Locale;
}) {
    const pathname = usePathname();
    const [locale, setLocale] = useState<Locale>(initialLocale);

    useEffect(() => {
        const animationFrame = requestAnimationFrame(() => {
            const queryLocale = normalizeLocale(
                new URLSearchParams(window.location.search).get('locale')
            );
            const nextLocale = queryLocale || getCookieLocale() || initialLocale;
            setLocale((currentLocale) => (
                currentLocale === nextLocale ? currentLocale : nextLocale
            ));
            document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
            document.documentElement.lang = nextLocale;
        });

        return () => cancelAnimationFrame(animationFrame);
    }, [initialLocale, pathname]);

    const value = useMemo<LocaleContextValue>(() => ({
        locale,
        translations: getTranslations(locale),
        localeHref: (nextLocale) => addLocaleToHref(
            `${pathname}${typeof window === 'undefined' ? '' : window.location.search}`,
            nextLocale
        ),
        localizedHref: (href) => addLocaleToHref(href, locale),
        selectLocale: (nextLocale) => {
            document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
            setLocale(nextLocale);
            document.documentElement.lang = nextLocale;
        },
    }), [locale, pathname]);

    return (
        <LocaleContext.Provider value={value}>
            {children}
        </LocaleContext.Provider>
    );
}

export const useI18n = () => useContext(LocaleContext);
