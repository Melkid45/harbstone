import { cookies, headers } from "next/headers";
import {
    defaultLocale,
    normalizeLocale,
    type Locale,
} from "./config";
import { localeRequestHeader } from "./routing";

export const getRequestLocale = async (
    value?: string | string[]
): Promise<Locale> => {
    const queryLocale = normalizeLocale(
        Array.isArray(value) ? value[0] : value
    );

    if (queryLocale) {
        return queryLocale;
    }

    const headerStore = await headers();
    const pathnameLocale = normalizeLocale(
        headerStore.get(localeRequestHeader)
    );

    if (pathnameLocale) {
        return pathnameLocale;
    }

    const cookieStore = await cookies();
    return normalizeLocale(cookieStore.get('locale')?.value) || defaultLocale;
};
