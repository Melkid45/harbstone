import {
    normalizeLocale,
    type Locale,
} from "./config";
import { getLegacyWorksFilter } from "../_lib/worksRouting";

export const localeRequestHeader = 'x-harbstone-locale';

const ensureLeadingSlash = (pathname: string) => (
    pathname.startsWith('/') ? pathname : `/${pathname}`
);

export const getPathnameLocale = (pathname: string): Locale | null => {
    const [, firstSegment] = ensureLeadingSlash(pathname).split('/');

    return normalizeLocale(firstSegment?.toLowerCase());
};

export const stripLocaleFromPathname = (pathname: string) => {
    const normalizedPathname = ensureLeadingSlash(pathname);
    const [, firstSegment] = normalizedPathname.split('/');

    if (!normalizeLocale(firstSegment?.toLowerCase())) {
        return normalizedPathname;
    }

    const pathnameWithoutLocale = normalizedPathname.slice(firstSegment.length + 1);

    return pathnameWithoutLocale || '/';
};

export const localizePathname = (pathname: string, locale: Locale) => {
    const pathnameWithoutLocale = stripLocaleFromPathname(pathname);
    const normalizedPathname = pathnameWithoutLocale === '/'
        ? ''
        : pathnameWithoutLocale.replace(/\/+$/, '');

    return `/${locale}${normalizedPathname}/`;
};

export const localizeHref = (href: string, locale: Locale) => {
    if (!href.startsWith('/') || href.startsWith('//')) {
        return href;
    }

    const url = new URL(href, 'https://harbstone.local');
    const legacyWorksFilter = getLegacyWorksFilter(
        url.pathname,
        url.searchParams
    );

    if (legacyWorksFilter) {
        url.pathname = legacyWorksFilter.pathname;
        legacyWorksFilter.removeSearchParams.forEach((name) => (
            url.searchParams.delete(name)
        ));
    }

    url.pathname = localizePathname(url.pathname, locale);
    url.searchParams.delete('locale');

    return `${url.pathname}${url.search}${url.hash}`;
};
