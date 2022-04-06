import Link from 'next/link';
import { Post } from '../../lib/api';
import BlogPost from '../BlogPost';
import QoiViewer from '../QoiViewer';

type Props = {
    posts: Omit<Post, 'slug'>[];
}

const BlogPostsFeed: React.FC<Props> = ({ posts }) => {
    return (<div id="blog-post-feed" className="content">
        <div style={{ height: "80%" }} >
            {posts.map(post => <BlogPost key={post.realSlug} post={post}></BlogPost>)}
        </div>
        <div className="blog-post-all">
            <Link href="/blog" passHref>
                <a>Show all blog entries.</a>
            </Link>
        </div>
    </div>)
}

BlogPostsFeed.displayName = "Blog Posts"

export default BlogPostsFeed;