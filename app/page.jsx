import Link from "next/link";
import TendersList from "./tenders/TendersList";

export default function Home() {
  return (
    <main>
      <h2>Government of Kenya Tenders</h2>

      <div className="card">
        <TendersList />
      </div>

    </main>
  )
}

