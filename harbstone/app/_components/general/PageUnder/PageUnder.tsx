'use client';

import RequestBlock from '../../sections/RequestBlock/RequestBlock';
import Footer from '../Footer/Footer';
import styles from './PageUnder.module.scss';
import { requestInputs, requestPricing } from '@/app/_data/requestForm';
import { useI18n } from '@/app/_i18n/LocaleProvider';
import type { FooterNavigationGroup } from '../Footer/Footer';

export default function PageUnder({
    footerCategories,
}: {
    footerCategories?: FooterNavigationGroup[];
}) {
    const { translations: t } = useI18n();
    const localizedInputs = requestInputs.map((input) => ({
        ...input,
        placeholder: t.form[input.name as 'name' | 'email' | 'phone' | 'message'],
    }));

    return (
        <div className={styles['page-under']}>
            <RequestBlock
                title={t.form.title}
                inputs={localizedInputs}
                pricing={requestPricing}
            />
            <Footer categories={footerCategories} />
        </div>
    )
}
