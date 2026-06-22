import BlockWrapper from "@/app/_components/general/block/BlockWrapper/BlockWrapper";
import Breadcrumbs from "@/app/_components/general/Breadcrumbs/Breadcrumbs";
import Link from "next/link";
import styles from './WorkHeroBlock.module.scss';
import Button from "@/app/_components/general/Button/Button";

interface WorkHeroBlockProps {
    title: string;
    description?: string;
    project_link?: string;
    project_link_type?: string;
    industry?: string;
    categories?: {
        label: string;
        href?: string;
    }[];
    celebritie?: string;
}


export default function WorkHeroBlock({
    title,
    description,
    project_link,
    project_link_type,
    industry,
    categories,
    celebritie
}: WorkHeroBlockProps) {
    return (
        <BlockWrapper background="white" padding="none" number={true}>
            <Breadcrumbs
                type="dark"
                breadcrumbs={[
                    { label: 'Main', href: '/' },
                    { label: 'Works', href: '/works' },
                    { label: title },
                ]}
            />
            <div className={styles['work-hero']}>
                <div className={styles['work-hero__header']}>
                    <div className={styles['work-hero__content']}>
                        <h1 className="heading heading--font-1 heading--large heading--dark-color">
                            {title}
                        </h1>
                        {description && (
                            <p className="text text--medium text--dark-color">
                                {description}
                            </p>
                        )}
                    </div>
                    <div className={styles['work-hero__meta']}>
                        {industry && (
                            <div className={styles['work-hero__meta-item']}>
                                <p className={`${styles['work-hero__meta-label']} text text--small text--dark-color text--weight-400`}>
                                    Industry:
                                </p>
                                <span className={`${styles['work-hero__meta-value']} text text--medium text--dark-color text--weight-500`}>
                                    {industry}
                                </span>
                            </div>
                        )}
                        {celebritie && (
                            <div className={styles['work-hero__meta-item']}>
                                <p className={`${styles['work-hero__meta-label']} text text--small text--dark-color text--weight-400`}>
                                    Celebrity:
                                </p>
                                <span className={`${styles['work-hero__meta-value']} text text--medium text--dark-color text--weight-500`}>
                                    {celebritie}
                                </span>
                            </div>
                        )}
                        {project_link && project_link_type && (
                            <div className={styles['work-hero__meta-item']}>
                                <p className={`${styles['work-hero__meta-label']} text text--small text--dark-color text--weight-400`}>
                                    Project link:
                                </p>
                                <Link target="_blank" className={`${styles['work-hero__meta-link']} text text--medium text--dark-color text--weight-500`} href={project_link}>
                                    {project_link_type}
                                </Link>
                            </div>
                        )}
                        {categories && (
                            <div className={`${styles['work-hero__meta-item']} ${styles['work-hero__meta-item--wide']}`}>
                                <p className={`${styles['work-hero__meta-label']} text text--small text--dark-color text--weight-400`}>
                                    Services:
                                </p>
                                <div className={styles['work-hero__tags']}>
                                    {categories.map((item) => (
                                        <Button key={item.label} isLink={true} href={item.href ? item.href : '/works'} customClass={styles['work-hero__tag']} size="large" background="light" color="dark">
                                            {item.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BlockWrapper>
    )
}
