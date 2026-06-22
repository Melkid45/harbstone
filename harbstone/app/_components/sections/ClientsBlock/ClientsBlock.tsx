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
    const renderClient = (client: ClientsBlockProps['clients'][number], index: number) => {
        const logo = <Image src={client.logo} alt={client.name} />;

        return client.href ? (
            <Link key={`${client.name}-${index}`} href={client.href}>
                {logo}
            </Link>
        ) : (
            <span key={`${client.name}-${index}`}>
                {logo}
            </span>
        );
    };

    return (
        <BlockWrapper background="white" padding="pt" isContainer={false}>
            <div className={styles.clients}>
                <div className={styles.clients__track}>
                    <div className={styles.clients__row}>
                        {clients.map(renderClient)}
                    </div>
                    <div className={styles.clients__row}>
                        {clients.map((client, index) => renderClient(client, index + clients.length))}
                    </div>
                </div>
            </div>
        </BlockWrapper>
    )
}
