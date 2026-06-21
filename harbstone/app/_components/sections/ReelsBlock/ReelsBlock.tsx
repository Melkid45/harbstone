import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";

interface ReelsBlockProps {
    video: string;
}

const VIMEO_PLAYER_PARAMS = {
    autoplay: '1',
    muted: '1',
    loop: '1',
    controls: '0',
    background: '1',
    playsinline: '1',
    byline: '0',
    title: '0',
    portrait: '0',
    dnt: '1',
    quality: '1080p',
};

const getVimeoUrl = (source: string) => {
    const normalizedSource = source.trim().replaceAll('&amp;', '&');
    const sourceWithProtocol = /^https?:\/\//.test(normalizedSource)
        ? normalizedSource
        : `https://${normalizedSource}`;

    try {
        const url = new URL(sourceWithProtocol);
        const pathParts = url.pathname.split('/').filter(Boolean);
        const isPlayerUrl = url.hostname.includes('player.vimeo.com');
        const videoId = isPlayerUrl
            ? pathParts[pathParts.indexOf('video') + 1]
            : pathParts.find((part) => /^\d+$/.test(part));

        if (!videoId) {
            return null;
        }

        const videoIdIndex = pathParts.indexOf(videoId);
        const pathHash = !isPlayerUrl && videoIdIndex >= 0
            ? pathParts[videoIdIndex + 1]
            : undefined;
        const privacyHash = url.searchParams.get('h') ?? pathHash;
        const playerUrl = new URL(`https://player.vimeo.com/video/${videoId}`);

        if (privacyHash) {
            playerUrl.searchParams.set('h', privacyHash);
        }

        Object.entries(VIMEO_PLAYER_PARAMS).forEach(([key, value]) => {
            playerUrl.searchParams.set(key, value);
        });

        return {
            id: videoId,
            src: playerUrl.toString(),
        };
    } catch {
        return null;
    }
};


export default function ReelsBlock({
    video
}: ReelsBlockProps) {
    const vimeo = getVimeoUrl(video);

    if (!vimeo) {
        return null;
    }

    return (
        <BlockWrapper background="white" padding="pt">
            <div className="block__video">
                <div
                    className="block__video-player vimeo-container"
                    data-vimeo-id={vimeo.id}
                    data-vimeo-initialized="true"
                    data-animation-bound="true"
                >
                    <iframe
                        src={vimeo.src}
                        title="Vimeo video"
                        loading="eager"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        data-ready="true"
                    ></iframe>
                </div>
            </div>
        </BlockWrapper>
    )
}
