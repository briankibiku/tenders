// const TendersDisplay = ({ tenders, isLoading }) => {
//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   const handleButtonClick = (url) => {
//     console.log(url);
//     window.open(`https://tenders.go.ke${url}`, "_blank");
//   };
//   return (
//     <div>
//       {tenders.map((tender) => (
//         <div key={tender.id} className="card">
//           <div className="px-4">
//             <h3>Institution: {tender.pe.name}</h3>
//             <p>Title: {tender.title}</p>
//             <p>Tender Type: {tender.procurement_method.title}</p>
//             <p>
//               Publish Date: {new Date(tender.published_at).toLocaleDateString()}
//             </p>
//             <p>Close Date: {new Date(tender.close_at).toLocaleDateString()}</p>
//             <button
//               className="mt-2 w-full flex justify-center text-white bg-blue-500 hover:bg-blue-600 rounded py-2 px-4"
//               onClick={() => handleButtonClick(tender.documents[1].url)}
//             >
//               View
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TendersDisplay;

const TendersDisplay = ({ tenders, isLoading }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleButtonClick = (url) => {
    if (url) {
      window.open(`https://tenders.go.ke${url}`, "_blank");
    } else {
      console.error("Document URL is not available");
    }
  };

  return (
    <div>
      {tenders.map((tender) => {
        // console.log(tender.documents[0].url);
        // Ensure the documents array exists and has at least two elements
        // const documentUrl =
        //   tender.documents && tender.documents.length >= 1
        //     ? tender.documents[0].url
        //     : null;
        // console.log(documentUrl);

        return (
          <div key={tender.id} className="card">
            <div className="px-4">
              <h3>Institution: {tender.pe.name}</h3>
              <p>Title: {tender.title}</p>
              <p>Tender Type: {tender.procurement_method.title}</p>
              <p>
                Publish Date:{" "}
                {new Date(tender.published_at).toLocaleDateString()}
              </p>
              <p>
                Close Date: {new Date(tender.close_at).toLocaleDateString()}
              </p>
              <button
                className="mt-2 w-full flex justify-center text-white bg-blue-500 hover:bg-blue-600 rounded py-2 px-4"
                onClick={() => handleButtonClick(tender.documents[0].url)}
                disabled={!tender.documents[0].url} // Disable button if URL is not available
              >
                View
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TendersDisplay;
