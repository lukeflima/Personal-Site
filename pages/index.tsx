

import Layout from "../components/Layout"
import Landing from "../components/Landing"
import AboutMe from "../components/AboutMe"
import BlogPostsFeed from "../components/BlogPostsFeed";
import { Post, getAllPosts, getPostBySlug } from "../lib/api";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

type Props = {
    posts: Omit<Post, 'slug'>[];
}


const Index: React.FC<Props> = ({ posts }) => {

    return (
        <Layout>
            <Landing />
            <AboutMe />
            <BlogPostsFeed posts={posts} />
        </Layout>
    );
}

export default Index;


export const getStaticProps: GetStaticProps = async () => {

    const posts = getAllPosts().slice(0, 4)

    return {
        props: {
            posts
        }
    }
}