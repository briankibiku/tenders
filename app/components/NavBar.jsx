import React from 'react'
import Link from 'next/link'


export default function NavBar() {
    return (
        <nav>
            <h1>GOK Tenders</h1>
            <Link href="/">Home</Link>
            <Link href="/tenders">Tenders</Link>
        </nav>
    )
}
