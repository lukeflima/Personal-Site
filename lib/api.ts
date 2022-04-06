import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'posts')

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory)
}

interface BlogPostData {
    title: string
    date: string
    excerpt: string
    author: {
        name: string
        picture: string
    }
    ogImage: string
    coverImage: string
    thumb: string
}

export type Post = BlogPostData & {
    realSlug: string
    slug: string
    content: string
}

export function getPostBySlug(slug: string): Post {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = join(postsDirectory, `${realSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const blogPost: Post = {
        realSlug,
        content,
        slug: realSlug,
        ...data as BlogPostData,
    }

    return blogPost
}

export function getAllPosts() {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    return posts
}