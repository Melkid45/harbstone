import { ArrowUpRight, RotateCcw } from "lucide-react";
import Button from "./_components/general/Button/Button";
import BlockWrapper from "./_components/general/block/BlockWrapper/BlockWrapper";
import styles from "./not-found.module.scss";

export default function NotFound() {
    return (
        <BlockWrapper number={true} background="white" padding="pb">
            <div className={styles.notFound}>
                <div className={styles.notFound__content}>
                    <p className="text text--small text--dark-color text--weight-500">
                        Error 404
                    </p>
                    <h1 className={styles.notFound__code}>
                        404
                    </h1>
                    <div className={styles.notFound__text}>
                        <h2 className="heading heading--standard heading--font-2 heading--dark-color heading--weight-600">
                            This page went off brief.
                        </h2>
                        <p className="text text--medium text--dark-color text--weight-400">
                            The link may be outdated, moved, or still waiting for its final cut.
                        </p>
                    </div>
                    <div className={styles.notFound__actions}>
                        <Button isLink={true} href="/" background="dark" color="white" size="large">
                            <RotateCcw />
                            Back to main
                        </Button>
                        <Button isLink={true} href="/works" background="white" border="dark" color="dark" size="large">
                            <ArrowUpRight />
                            See works
                        </Button>
                    </div>
                </div>
            </div>
        </BlockWrapper>
    );
}
