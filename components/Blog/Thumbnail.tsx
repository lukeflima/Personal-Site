// import link artifacts
import Link from 'next/link';
// import image artifacts
import Image from 'next/image';

// Thumbnail properties
type Props = {
    // Thumbnail title
    title?: string;
    // Thumbnail image src
    src: string;
    // Thumbnail slug link
    slug?: string;
}


const Thumbnail: React.FC<Props> = ({ title, src, slug }: Props) => {
    // Add the Thumbnail cover image
    if (src == null) {
        return <></>
    }
    const image = (
        <div style={{ maxWidth: 150 }}>
            <Image
                width="350px"
                height="300px"
                layout='intrinsic'

                src={src}
                alt={`Thumbnail cover image ${title}`}
            />
        </div>
    );

    // return the Thumbnail cover image slug
    return (
        <>
            {slug ? (
                <Link href={`/posts/${slug}`}>
                    <a aria-label={title}>{image}</a>
                </Link>
            ) : (
                image
            )}
        </>
    )
}

// export Thumbnail module
export default Thumbnail;