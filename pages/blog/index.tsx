import { GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { getAllPosts, Post } from "../../lib/api";

type Props = {
    posts: Omit<Post, 'slug'>[]
}


const Blog: React.FC<Props> = ({ posts }) => {
    return <div style={{ marginLeft: 200 }}>
        <h1>Blog Index</h1>
        {posts.map(post =>
            <div key={post.realSlug} style={{ paddingBottom: 10 }} >
                <Link href={`/blog/${post.realSlug}`} passHref>
                    <a style={{ fontWeight: "bold" }}>{post.title}</a>
                </Link>
            </div>
        )}
    </div>;
}

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
    const posts = getAllPosts()

    return {
        props: {
            posts
        }
    }
}