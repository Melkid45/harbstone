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
    type Locale,
    type Translations,
} from "./config";
import { localizeHref } from "./routing";

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
            setLocale((currentLocale) => (
                currentLocale === initialLocale ? currentLocale : initialLocale
            ));
            document.cookie = `locale=${initialLocale}; path=/; max-age=31536000; samesite=lax`;
            document.documentElement.lang = initialLocale;
        });

        return () => cancelAnimationFrame(animationFrame);
    }, [initialLocale]);

    const value = useMemo<LocaleContextValue>(() => ({
        locale,
        translations: getTranslations(locale),
        localeHref: (nextLocale) => localizeHref(
            `${pathname}${typeof window === 'undefined'
                ? ''
                : `${window.location.search}${window.location.hash}`}`,
            nextLocale
        ),
        localizedHref: (href) => localizeHref(href, locale),
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
