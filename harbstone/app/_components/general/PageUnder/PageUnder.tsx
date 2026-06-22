import RequestBlock from '../../sections/RequestBlock/RequestBlock';
import Footer from '../Footer/Footer';
import styles from './PageUnder.module.scss';
import { requestInputs, requestPricing } from '@/app/_data/requestForm';

export default function PageUnder() {
    return (
        <div className={styles['page-under']}>
            <RequestBlock
                title='Let’s make it happen together!'
                inputs={requestInputs}
                pricing={requestPricing}
            />
            <Footer/>
        </div>
    )
}
