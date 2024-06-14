// import Link from 'next/link'
// import { notFound } from 'next/navigation'
// import React from 'react'

// async function fetchTenders() {
//     const resp = await fetch('https://tenders.go.ke/api/TenderDisplay/OpenTenders/Open')

//     if (!resp.ok) {
//         notFound()
//     }

//     return resp.json()
// }

// export default async function TendersList() {
//     const tenders = await fetchTenders()
//     return (
//         <main>
//             {tenders.map((tender) => (
//                 <div key={tender.id_tenderdetails} className='card my-5'>
//                     <h3>Institution : {tender.pename}</h3>
//                     <p>Title : {tender.title}</p>
//                     <p>Tender Type : {tender.procurementmethod}</p>
//                     <p>Publish Date : {tender.publisheddate}</p>
//                     <p>Close Date : {tender.closedate}</p>

//                     <button
//                         className="btn-primary"
//                     >
//                         <Link className='btn-primary' href={`https://tenders.go.ke/OneTender/${tender.id_tenderdetails}`}>View</Link>
//                     </button>
//                 </div>
//             ))}
//         </main>
//     )
// }
"use client"
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

// Fetch tenders function
async function fetchTenders() {
    const resp = await fetch('https://tenders.go.ke/api/TenderDisplay/OpenTenders/Open')
    if (!resp.ok) {
        notFound()
    }
    return resp.json()
}

// TendersList component
export default function TendersList() {
    const [tenders, setTenders] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredTenders, setFilteredTenders] = useState([])
    const router = useRouter()

    // Fetch tenders when the component mounts
    useEffect(() => {
        async function getTenders() {
            const tendersData = await fetchTenders()
            setTenders(tendersData)
            setFilteredTenders(tendersData)
        }
        getTenders()
    }, [])

    // Handle search query change
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase()
        setSearchQuery(query)
        if (query === "") {
            setFilteredTenders(tenders)
        } else {
            const filtered = tenders.filter(tender =>
                tender.pename.toLowerCase().includes(query)
            )
            setFilteredTenders(filtered)
        }
    }
    const handleButtonClick = (id_tenderdetails) => {
        router.push(`https://tenders.go.ke/OneTender/${id_tenderdetails}`)
    }

    return (
        <main>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by institution name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            {filteredTenders.map((tender) => (
                <div key={tender.id_tenderdetails} className='card my-5'>
                    <h3>Institution : {tender.pename}</h3>
                    <p>Title : {tender.title}</p>
                    <p>Tender Type : {tender.procurementmethod}</p>
                    <p>Publish Date : {tender.publisheddate}</p>
                    <p>Close Date : {tender.closedate}</p>
                    <button
                        className="mt-2 w-full flex justify-center text-white bg-blue-500 hover:bg-blue-600 rounded py-2 px-4"
                        onClick={() => handleButtonClick(tender.id_tenderdetails)}
                    >
                        View
                    </button>
                </div>
            ))}
        </main>
    )
}
