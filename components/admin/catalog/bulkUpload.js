import React from "react";
import CatalogEditView from "./catalogEditView";

function BulkUpload() {
  return (
    <>
    <div className="d-flex">
      <div className="col-10 p-0">
        <div className="catelog-search font12 txt_gray">Search</div>
      </div>
      <div className="col-2 p-0 text-end align-self-end">
        <button className="btn btn-sm btn-icons">
          <img src="/icons/add.png" alt="add-icon" />
        </button>
        {/* <button className="btn btn-sm btn-icons">
          <img src="/icons/refresh.png" alt="refresh-icon" />
        </button> */}
      </div>
    </div>
      <CatalogEditView />
    </>
  );
}

export default BulkUpload;
