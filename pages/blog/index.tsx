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
            <Link key={post.realSlug} href={`/blog/${post.realSlug}`} passHref>
                <a style={{ fontWeight: "bold" }}>{post.title}</a>
            </Link>
        )}
    </div>;
}

export default Blog;

export const getStaticProps: GetStaticProps = async () => {

    const posts = getAllPosts()

    console.log(posts)

    return {
        props: {
            posts
        }
    }
}