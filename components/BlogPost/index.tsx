import Link from "next/link";
import { Post } from "../../lib/api";
import Thumbnail from "../Blog/Thumbnail";

type Props = {
    post: Omit<Post, 'slug'>;
}
const BlogPost: React.FC<Props> = ({ post }) => {

    return (
        <div className="blog-post">
            <Link href={`/blog/${post.realSlug}`} passHref>
                <a className="blog-post-content">
                    <Thumbnail title={post.title} src={post.thumb} />
                    <h2 className="blog-post-title">{post.title}</h2>
                </a>
            </Link >
        </div>
    );
}

export default BlogPost