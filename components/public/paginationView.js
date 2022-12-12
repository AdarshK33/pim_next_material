import React, { useMemo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import actions from "../../redux/action";

function PaginationView({
  getListData,
  itemsPerPage = 10,
  totalProductCount,
  currentPgNo,
}) {
  console.log("totalProductCount", totalProductCount);
  const items = [...Array(totalProductCount).keys()];
  //   const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    let reqData = {
      pageSize: 10,
      pageNo: event.selected,
    };
    currentPgNo(event.selected);
    getListData(reqData);
  };
  useEffect(() => {
    const newEndOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${newEndOffset}`);
    setPageCount(Math.ceil(items.length / itemsPerPage));
    setEndOffset(newEndOffset);
  }, [itemOffset, itemsPerPage]);

  // const paginate = useMemo(() => {
  //   const btn = [];
  //   for (var i = 1; i <= totalPages; i++) {
  //     btn.push({ pageSize: 10, pageNo: i - 1 });
  //   }
  //   return btn;
  // }, [totalPages]);

  return (
    <div className="w-100 d-flex mx-0 py-3 px-2 bg-white font12 txt_gray">
      <>
        <div className="col-md my-auto">
          Showing {itemOffset} to {endOffset} of {totalProductCount} Items
        </div>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
      {/* <div className="col text-end">
        {paginate.map((page, index) => (
          <button
            key={`paginateBtn${index}`}
            onClick={() => getListData(page)}
            className={`btn btn-sm py-0 me-1 paginate-btn ${
              index === activeKey && "active"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div> */}
    </div>
  );
}
// const mapStateToProps = state => ({
// 	currentPgNo: state.reducer.currentPgNo
// });

const mapDispatchToProps = {
  currentPgNo: actions.currentPgNo,
};
export default connect(null, mapDispatchToProps)(React.memo(PaginationView));
