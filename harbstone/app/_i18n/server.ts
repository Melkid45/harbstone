import { cookies } from "next/headers";
import {
    defaultLocale,
    normalizeLocale,
    type Locale,
} from "./config";

export const getRequestLocale = async (
    value?: string | string[]
): Promise<Locale> => {
    const queryLocale = normalizeLocale(
        Array.isArray(value) ? value[0] : value
    );

    if (queryLocale) {
        return queryLocale;
    }

    const cookieStore = await cookies();
    return normalizeLocale(cookieStore.get('locale')?.value) || defaultLocale;
};
