export const getWorksFilterHref = (
    service?: string,
    soft?: string,
) => {
    if (!service) {
        return '/works';
    }

    const segments = [service, soft]
        .filter((segment): segment is string => Boolean(segment))
        .map((segment) => encodeURIComponent(segment));

    return `/works/${segments.join('/')}`;
};

export const getLegacyWorksFilter = (
    pathname: string,
    searchParams: URLSearchParams,
) => {
    const normalizedPathname = pathname === '/'
        ? pathname
        : pathname.replace(/\/+$/, '');

    if (
        normalizedPathname !== '/works'
        || (!searchParams.has('service') && !searchParams.has('soft'))
    ) {
        return null;
    }

    const service = searchParams.get('service')?.trim() || undefined;
    const soft = service
        ? searchParams.get('soft')?.trim() || undefined
        : undefined;

    return {
        pathname: getWorksFilterHref(service, soft),
        removeSearchParams: ['service', 'soft'],
    };
};
