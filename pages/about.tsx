import Router from 'next/router'
import { MainLayout } from '../layouts/MainLayout'

export default function About({ title }) {
    return (
        <MainLayout title="About | Next App">
            <h1>{title}</h1>

            <button onClick={() => Router.push('/')}>Go back to home</button>
            <button onClick={() => Router.push('/posts')}>Go to posts</button>
        </MainLayout>
    )
}

About.getInitialProps = async () => {
    const response = await fetch(`${process.env.API_URL}/about`)
    const about = await response.json()

    return { title: about.title }
}