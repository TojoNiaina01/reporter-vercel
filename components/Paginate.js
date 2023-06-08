import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';



export default function Paginate ({itemsPerPage, initialPage, handlerPage, items}) {
    // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    //console.log(`itemOffset = ${itemOffset} and endOffset = ${endOffset}`)
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
    handlerPage(event);
  };

  return (
    <>
      <ReactPaginate
        className="flex text-lg font-normal paginateList"
        pageClassName="px-4 py-2 text-gray-800 border border border-solid text-textBlack pageSelected"
        breakClassName="px-4 py-2 text-gray-800 text-textBlack"
        nextClassName="bg-main-500 text-textBlack rounded-full text-center flex justify-center items-center px-4 ml-4"
        previousClassName="bg-main-500 text-textBlack rounded-full text-center flex justify-center items-center px-4 mr-4"
        activeClassName="bg-[#659a97]"
        disabledClassName="hidden"
        initialPage={initialPage}
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
