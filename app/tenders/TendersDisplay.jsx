const TendersDisplay = ({ tenders, isLoading }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {tenders.map((tender) => (
        <div key={tender.id} className="card">
          <div className="px-4">
            <h3>Institution: {tender.pe.name}</h3>
            <p>Title: {tender.title}</p>
            <p>Tender Type: {tender.procurement_method.title}</p>
            <p>
              Publish Date: {new Date(tender.published_at).toLocaleDateString()}
            </p>
            <p>Close Date: {new Date(tender.close_at).toLocaleDateString()}</p>
            <button
              className="mt-2 w-full flex justify-center text-white bg-blue-500 hover:bg-blue-600 rounded py-2 px-4"
              onClick={() => handleButtonClick(tender.id)}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TendersDisplay;
