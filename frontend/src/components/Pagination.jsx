import React from "react";

const PaginationComponent = ({currentPage, totalPages, onPageChange}) =>{
    //Generate page numbers based on total pages
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i+1);

    return(
        <div>
            <button 
            disabled={currentPage === 1}
            onClick={()=> onPageChange(currentPage - 1)}
            >
                &laquo; Prev
            </button>

            {pageNumbers.map((number) =>(
                <button key={number}
                onClick={()=> onPageChange(number)}>
                {number}
                </button>
            ))}

            <button
            disabled={currentPage === totalPages}
            onClick={()=> onPageChange(currentPage + 1)}>
                    Next &raquo;
            </button>

        </div>
    )
}
export default PaginationComponent;