import { NextRequest, NextResponse } from "next/server";
import {
    defaultLocale,
    normalizeLocale,
} from "./app/_i18n/config";
import {
    getPathnameLocale,
    localeRequestHeader,
    localizePathname,
    stripLocaleFromPathname,
} from "./app/_i18n/routing";
import { getLegacyWorksFilter } from "./app/_lib/worksRouting";

const localeCookieOptions = (request: NextRequest) => ({
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax' as const,
    secure: request.nextUrl.protocol === 'https:',
});

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    const pathnameLocale = getPathnameLocale(url.pathname);
    const internalLocale = normalizeLocale(
        request.headers.get(localeRequestHeader)
    );

    if (internalLocale && !pathnameLocale) {
        return NextResponse.next();
    }

    if (!pathnameLocale) {
        const queryLocale = normalizeLocale(url.searchParams.get('locale'));
        const cookieLocale = normalizeLocale(request.cookies.get('locale')?.value);
        const locale = queryLocale || cookieLocale || defaultLocale;
        const redirectUrl = new URL(request.url);
        const legacyWorksFilter = getLegacyWorksFilter(
            url.pathname,
            url.searchParams
        );

        redirectUrl.pathname = localizePathname(
            legacyWorksFilter?.pathname || url.pathname,
            locale
        );
        redirectUrl.searchParams.delete('locale');
        legacyWorksFilter?.removeSearchParams.forEach((name) => (
            redirectUrl.searchParams.delete(name)
        ));

        return NextResponse.redirect(redirectUrl, 308);
    }

    const pathnameWithoutLocale = stripLocaleFromPathname(url.pathname);
    const legacyWorksFilter = getLegacyWorksFilter(
        pathnameWithoutLocale,
        url.searchParams
    );
    const canonicalPathname = localizePathname(
        legacyWorksFilter?.pathname || url.pathname,
        pathnameLocale
    );

    if (
        url.pathname !== canonicalPathname
        || url.searchParams.has('locale')
        || Boolean(legacyWorksFilter)
    ) {
        const redirectUrl = new URL(request.url);
        redirectUrl.pathname = canonicalPathname;
        redirectUrl.searchParams.delete('locale');
        legacyWorksFilter?.removeSearchParams.forEach((name) => (
            redirectUrl.searchParams.delete(name)
        ));

        return NextResponse.redirect(redirectUrl, 308);
    }

    const internalPathname = stripLocaleFromPathname(url.pathname);
    url.pathname = internalPathname === '/'
        ? internalPathname
        : internalPathname.replace(/\/+$/, '');

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(localeRequestHeader, pathnameLocale);

    const response = NextResponse.rewrite(url, {
        request: {
            headers: requestHeaders,
        },
    });

    response.cookies.set(
        'locale',
        pathnameLocale,
        localeCookieOptions(request)
    );

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|_next/webpack-hmr|.*\\..*).*)',
    ],
};
