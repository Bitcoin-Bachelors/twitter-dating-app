import { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

type Props = {
    children?: ReactNode
    title?: string
    currentPage?: string
}

const Layout = ({ children, title = '💸 Sugar Daddy Site for Bitcoin Bachelors', currentPage }: Props) => (
    <div className="flex flex-col min-h-screen">
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
            {/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
        </Head>
        <Header />
        <div className="flex-1">
            {children}
        </div>
        <Footer />
    </div>
)

export default Layout