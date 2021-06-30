import { NextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { MyPost } from '../../interfaces/post'
import { MainLayout } from '../../layouts/MainLayout'

interface PostPageProps {
    post: MyPost | null
}

export default function Post({ post: serverPost }: PostPageProps) {
    const router = useRouter()
    const [post, setPost] = useState(serverPost)

    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/posts/${router.query.id}`)
            const json = await response.json()
            setPost(json)
        }

        if (!serverPost) load()
    }, [])

    if (!post) return <MainLayout>Загрузка...</MainLayout>

    return (
        <MainLayout>
            <h1>{post.title}</h1>
            <hr />
            <p>{post.body}</p>
            <Link href="/posts"><a>Back to posts</a></Link>
        </MainLayout>
    )
}

interface PostNextPageContext extends NextPageContext {
    query: {
        id: string
    }
}

Post.getInitialProps = async ({ query, req }: PostNextPageContext) => {
    if (!req) return { post: null }
    const response = await fetch(`http://localhost:4200/posts/${query.id}`)
    const post: MyPost = await response.json()

    return { post }
}
