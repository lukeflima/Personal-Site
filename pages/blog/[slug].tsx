import { getPostBySlug, getAllPosts, Post } from '../../lib/api'
import { serialize } from 'next-mdx-remote/serialize';
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import QoiViewer from '../../components/QoiViewer';
import Thumbnail from '../../components/Blog/Thumbnail';

type Props = {
    source: MDXRemoteSerializeResult,
    frontMatter: Omit<Post, 'slug'>;
}

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {
    return (
        <div id="blog">
            <article>
                <div>
                    <Thumbnail title={frontMatter.title} src={frontMatter.coverImage} />
                    <h1>{frontMatter.title}</h1>
                </div>

                <p className="excerpt">{frontMatter.excerpt}</p>
                <MDXRemote components={{ QoiViewer }} {...source} />
            </article>
        </div>
    )
}

export default PostPage;

interface Iparams extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {

    const { slug } = context.params as Iparams;
    const { content, ...data } = getPostBySlug(slug)
    const mdxSource = await serialize(content, { scope: data as {} });

    return {
        props: {
            source: mdxSource,
            frontMatter: data
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    const posts = getAllPosts()

    const paths = posts.map((post) => ({
        params: {
            slug: post.slug
        }
    }));
    return {
        paths,
        fallback: false,
    }
}