import Image, { StaticImageData } from "next/image";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import Link from "next/link";
import styles from './ClientsBlock.module.scss';
interface ClientsBlockProps {
    clients: {
        name: string;
        logo: StaticImageData | string;
        href?: string;
    }[];
}

export default function ClientsBlock({
    clients
}: ClientsBlockProps) {
    return (
        <BlockWrapper background="white" padding="pt" isContainer={false}>
            <div className={styles.clients}>
                <div className={styles.clients__track}>
                    <div className={styles.clients__row}>
                        {clients.map((client, index) => (
                            <Link key={client.name + index} href={client.href ? client.href : ''}>
                                <Image src={client.logo} alt={client.name} />
                            </Link>
                        ))}
                    </div>
                    <div className={styles.clients__row}>
                        {clients.map((client, index) => (
                            <Link key={client.name + index} href={client.href ? client.href : ''}>
                                <Image src={client.logo} alt={client.name} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </BlockWrapper>
    )
}