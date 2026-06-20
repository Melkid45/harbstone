import RequestBlock from '../../sections/RequestBlock/RequestBlock';
import Footer from '../Footer/Footer';
import styles from './PageUnder.module.scss';

const inputsArray = [
    {
        name: 'name',
        type: 'text',
        error: '',
        placeholder: 'Your Name'
    },
    {
        name: 'email',
        type: 'email',
        error: '',
        placeholder: 'Your Email'
    },
    {
        name: 'phone',
        type: 'tel',
        error: '',
        placeholder: 'Your WhatsApp'
    },
    {
        name: 'message',
        type: 'text',
        error: '',
        placeholder: 'Tell as about Your project'
    },
]

const pricingArray = [
    {
        price: '5-15k'
    },
    {
        price: '15-25k'
    },
    {
        price: '25-50k'
    },
    {
        price: '50-100k+'
    },
]

export default function PageUnder() {
    return (
        <div className={styles['page-under']}>
            <RequestBlock
                title='Let’s make it happen together!'
                inputs={inputsArray}
                pricing={pricingArray}
            />
            <Footer/>
        </div>
    )
}
