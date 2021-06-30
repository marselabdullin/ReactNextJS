import { useState, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { MainLayout } from "../layouts/MainLayout"
import Link from 'next/link'
import { MyPost } from '../interfaces/post'
import { NextPageContext } from 'next'

interface PostsPageProps {
    posts: MyPost[]
}

export default function Posts({ posts: serverPosts }: PostsPageProps) {
    const [posts, setPosts] = useState(serverPosts)

    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/posts`)
            const json = await response.json()
            setPosts(json)
        }
        if (!serverPosts) load()
    }, [])


    return (
        <MainLayout title="Posts | Next App">
            <Head>
                <title>Posts Page</title>
            </Head>
            <h1>Post page</h1>
            <p>
                <button onClick={() => Router.push('/')}>Go back to home</button>
                <button onClick={() => Router.push('/about')}>Go to about</button>
            </p>
            {!posts && <h5>Loading ...</h5>}
            {posts && <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href={'/post/[id]'} as={`/post/${post.id}`}><a>{post.title}</a></Link>
                    </li>
                ))}
            </ul>}
        </MainLayout>
    )
}

Posts.getInitialProps = async ({ req }: NextPageContext) => {
    if (!req) return { posts: null }
    const response = await fetch('http://localhost:4200/posts')
    const posts = await response.json()

    return { posts }
}