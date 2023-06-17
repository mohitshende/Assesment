const PaginateComponent = ({
  pageNumber,
  setPageNumber,
  totalPages,
}: {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  totalPages: number;
}) => {
  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
        Previous Page
      </button>
      <span>Current Page: {pageNumber}</span>
      <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
        Next Page
      </button>
    </div>
  );
};

export default PaginateComponent;
