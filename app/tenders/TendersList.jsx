"use client";
import { notFound, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Loading from "../loading";
import TendersDisplay from "./TendersDisplay";
import Pagination from "./Pagination";

// Fetch tenders function
// async function fetchTenders() {
//   const resp = await fetch(
//     // "https://tenders.go.ke/api/TenderDisplay/OpenTenders/Open"
//     "https://tenders.go.ke/api/active-tenders?search=&perpage=10&sortby=&order=asc&page=1&tender_ref=&title=&pe:name=&procurementMethod:title=&procurementCategory:title=&close_at=&published_at=&addendum_added="
//   );
//   if (!resp.ok) {
//     notFound();
//   }
//   return resp.json();
// }

// TendersList component
export default function TendersList() {
  const [tenders, setTenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTenders, setFilteredTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch tenders when the component mounts
  useEffect(() => {
    // getTenders();
    fetchTenders(currentPage);
  }, [currentPage]);

  const fetchTenders = async (page = 1) => {
    setLoading(true);
    try {
      const resp = await fetch(
        // `https://tenders.go.ke/api/active-tenders?perpage=10&page=${page}`
        `https://tenders.go.ke/api/active-tenders?search=&perpage=10&sortby=&order=asc&page=${page}&tender_ref=&title=&pe:name=&procurementMethod:title=&procurementCategory:title=&close_at=&published_at=&addendum_added=`
      );
      if (!resp.ok) {
        throw new Error("Failed to fetch tenders");
      }
      const data = await resp.json();
      setTenders(data.data); // Tenders are usually in data.data
      setTotalPages(data.last_page); // Total pages from the API
    } catch (error) {
      console.error("Error fetching tenders:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDisposalTenders = async (page = 1) => {
    setLoading(true);
    try {
      const resp = await fetch(
        // `https://tenders.go.ke/api/active-tenders?perpage=10&page=${page}`
        `https://tenders.go.ke/api/active-tenders?search=&perpage=10&sortby=&order=asc&page=${page}&tender_ref=&title=disposal&pe:name=&procurementMethod:title=&procurementCategory:title=&close_at=&published_at=&addendum_added=`
      );
      if (!resp.ok) {
        throw new Error("Failed to fetch tenders");
      }
      const data = await resp.json();
      setTenders(data.data); // Tenders are usually in data.data
      setTotalPages(data.last_page); // Total pages from the API
    } catch (error) {
      console.error("Error fetching tenders:", error);
    } finally {
      setLoading(false);
    }
  };

  // const getTenders = async () => {
  //   setLoading(true);
  //   try {
  //     const tendersData = await fetchTenders();
  //     setTenders(tendersData);
  //     setFilteredTenders(tendersData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
    fetchDisposalTenders;
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <div className="search-container">
        <button
          className="mt-2  flex justify-center text-white bg-blue-500 hover:bg-blue-600 rounded py-2 px-4"
          onClick={() => fetchDisposalTenders()}
        >
          Fetch Disposal Tenders
        </button>
      </div>

      <div>
        <TendersDisplay tenders={tenders} loading={loading} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {/* {filteredTenders.map((tender) => (
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
      ))} */}
    </main>
  );
}
