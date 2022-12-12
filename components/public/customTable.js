import React, { Fragment, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import PaginationView from "./paginationView";

function CustomTable({
  tableName,
  head,
  content,
  tableContainarClass,
  showPagination,
  isCheckbox,
  pushTheId,
  totalProductCount,
  ...rest
}) {
  const [checkBoxState, setCheckBox] = useState(true);
  const handleCheckbox = () => {
    setCheckBox(!checkBoxState);
    if (checkBoxState) {
      pushTheId("all");
    } else {
      pushTheId("removeAll");
    }
  };
  return (
    <Fragment>
      <div
        className={`table-responsive table-stripe-white ${
          tableContainarClass && tableContainarClass
        }`}
      >
        <Table responsive striped borderless hover className="mb-0">
          <thead>
            <tr>
              {head.map((item, index) => (
                <th key={`tableHead${tableName}${index}`}>
                  {item.isCheckbox && (
                    <>
                      <input
                        type="checkbox"
                        //   checked={()=> { setCheckBox(!checkBoxState)}}
                        // name={data.articleNumber}
                        onChange={handleCheckbox}
                      />
                      <span>{item.name}</span>
                    </>
                  )}
                  {!item.isCheckbox && <>{item.name}</>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </Table>
      </div>
    </Fragment>
  );
}

export default React.memo(CustomTable);
