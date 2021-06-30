import Head from "next/head";
import Link from "next/link";

const NAV_HEIGHT = '50px'

export function MainLayout({ children, title = 'Next App' }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content="next,javascript,nextjs,react" />
                <meta name="description" content="next app" />
                <meta charSet="utf-8" />
            </Head>
            <nav>
                <Link href={'/'}><a>Home</a></Link>
                <Link href={'/about'}><a>About</a></Link>
                <Link href={'/posts'}><a>Posts</a></Link>
            </nav>
            <main>
                {children}
            </main>
            <style jsx>{`
                nav {
                    position: fixed;
                    height: ${NAV_HEIGHT};
                    left: 0;
                    top: 0;
                    right: 0;
                    background: darkblue;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }

                nav a {
                    color: white;
                    text-decoration: none;
                }

                main {
                    margin-top: ${NAV_HEIGHT};
                    padding: 1rem;
                }
            `}</style>
        </>
    )
}