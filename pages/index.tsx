import Link from 'next/link'
import { MainLayout } from '../layouts/MainLayout'

export default function Index() {
    return (
        <MainLayout>
            <h1>hello Next</h1>
            <p><Link href={'/about'}><a href="/about">About</a></Link></p>
            <p><Link href={'/posts'}><a href="/posts">Posts</a></Link></p>
        </MainLayout>
    )
}
