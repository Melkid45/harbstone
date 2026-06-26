'use client';

import { ReactNode } from "react";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import Button from "../../general/Button/Button";
import { ArrowUpRight } from "lucide-react";
import BlockTitle from "../../general/block/BlockTitle/BlockTitle";
import Breadcrumbs from "../../general/Breadcrumbs/Breadcrumbs";
import { useI18n } from "@/app/_i18n/LocaleProvider";
interface HeroBlockProps {
    title: string | ReactNode;
    description: string;
    fullText?: boolean;
    padding?: 'pb' | 'pt';
    actions?: {
        label: string;
        type: 'link' | 'popup';
        href?: string;
        popupId?: string;
    }[];
    breadcrumbs?: {
        label: string;
        href?: string;
    }[];
}

export default function HeroBlock({
    title,
    description,
    breadcrumbs,
    actions,
    fullText = false,
    padding = 'pb'
}: HeroBlockProps) {
    const { translations: t } = useI18n();
    const visibleActions = actions || [
        {
            label: t.common.startProject,
            type: 'popup' as const,
            popupId: 'request',
        },
        {
            label: t.common.seeResults,
            type: 'link' as const,
            href: '/works',
        },
    ];

    return (
        <BlockWrapper number={true} background="white" padding={padding}>
            {breadcrumbs?.length ? (
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                    type="dark"
                />
            ) : null}
            <div className="block__header">
                <BlockTitle
                    title={title}
                    description={description}
                    full={fullText}
                />
                {visibleActions.length > 0 ? (
                    <div className="block__actions">
                        {visibleActions.map((action, index) => (
                            action.type === 'link' ? (
                                <Button
                                    key={`${action.type}-${action.label}-${index}`}
                                    isLink={true}
                                    href={action.href || '/'}
                                    background={index === 0 ? 'dark' : 'white'}
                                    size="large"
                                    color={index === 0 ? 'white' : 'dark'}
                                    border={index === 0 ? 'light' : 'dark'}
                                >
                                    <ArrowUpRight />
                                    {action.label}
                                </Button>
                            ) : (
                                <Button
                                    key={`${action.type}-${action.label}-${index}`}
                                    background={index === 0 ? 'dark' : 'white'}
                                    size="large"
                                    color={index === 0 ? 'white' : 'dark'}
                                    border={index === 0 ? 'light' : 'dark'}
                                    data-popup-open={action.popupId || 'request'}
                                >
                                    <ArrowUpRight />
                                    {action.label}
                                </Button>
                            )
                        ))}
                    </div>
                ) : null}
            </div>
        </BlockWrapper>

    )
}
