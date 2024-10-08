"use client";
import { notFound, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Loading from "../loading";

// Fetch tenders function
async function fetchTenders() {
  const resp = await fetch(
    // "https://tenders.go.ke/api/TenderDisplay/OpenTenders/Open"
    "https://tenders.go.ke/api/active-tenders?search=&perpage=10&sortby=&order=asc&page=1&tender_ref=&title=&pe:name=&procurementMethod:title=&procurementCategory:title=&close_at=&published_at=&addendum_added="
  );
  if (!resp.ok) {
    notFound();
  }
  return resp.json();
}

// TendersList component
export default function TendersList() {
  const [tenders, setTenders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTenders, setFilteredTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch tenders when the component mounts
  useEffect(() => {
    getTenders();
  }, []);

  const getTenders = async () => {
    setLoading(true);
    try {
      const tendersData = await fetchTenders();
      setTenders(tendersData);
      setFilteredTenders(tendersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      setFilteredTenders(tenders);
    } else {
      const filtered = tenders.filter(
        (tender) =>
          tender.pename.toLowerCase().includes(query) ||
          tender.title.toLowerCase().includes(query) ||
          tender.procurementmethod.toLowerCase().includes(query)
      );
      setFilteredTenders(filtered);
    }
  };
  const handleButtonClick = (id_tenderdetails) => {
    router.push(`https://tenders.go.ke/OneTender/${id_tenderdetails}`);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by institution name, tender type, title"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-600 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      {filteredTenders.map((tender) => (
        <div key={tender.id_tenderdetails} className="card">
          <div className="px-4">
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
        </div>
      ))}
    </main>
  );
}
