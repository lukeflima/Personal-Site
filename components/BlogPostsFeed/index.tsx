import { Post } from '../../lib/api';
import BlogPost from '../BlogPost';
import QoiViewer from '../QoiViewer';

type Props = {
    posts: Omit<Post, 'slug'>[];
}

const BlogPostsFeed: React.FC<Props> = ({ posts }) => {
    return (<div id="blog-post-feed" className="content">
        {posts.map(post => <BlogPost key={post.realSlug} post={post}></BlogPost>)}
    </div>)
}

BlogPostsFeed.displayName = "Blog"

export default BlogPostsFeed;