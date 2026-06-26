'use client';

import Link from "next/link";
import React from "react";
import { useI18n } from "@/app/_i18n/LocaleProvider";

interface BreadcrumbsProps {
    type?: 'dark' | 'white'; 
    breadcrumbs: {
        label: string;
        href?: string;
    }[];
}

export default function Breadcrumbs({
    breadcrumbs,
    type = 'white'
}: BreadcrumbsProps) {
    const { localizedHref } = useI18n();

    return (
        <div className={`block__breadcrumbs text text--small text--${type}-color`}>
            {breadcrumbs.map((item) => (
                item.href ? (
                    <React.Fragment key={item.label}>
                        <Link href={localizedHref(item.href)} className={`text text--small text--${type}-color text--weight-300`}>
                            {item.label}
                        </Link>
                        <span className={`text text--small text--${type}-color text--weight-300`}>
                            /
                        </span>
                    </React.Fragment>
                ) : (
                    <span key={item.label} className={`text text--small text--${type}-color text--weight-400`}>
                        {item.label}
                    </span>
                )
            ))}
        </div>
    )
}
