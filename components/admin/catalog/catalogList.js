import React, { Fragment, useMemo, useState } from "react";
import CustomTable from "../../public/customTable";
import PaginationView from "../../public/paginationView";

function CatalogList({ list, getListData, ...rest }) {
  const [itemsCount, setItemsCount] = useState(list.totalElements);
  const tableHeadings = useMemo(() => {
    const arr = [
      { name: "Name" },
      // { name: "Catalog Owner" },
      { name: "Catalog Version" },
      { name: "Modified At" },
    ];
    return arr;
  }, []);

  const totalItems = useMemo(
    () => (
      <PaginationView
        totalProductCount={itemsCount}
        getListData={getListData}
      />
    ),
    [itemsCount]
  );
  const tableContent = (
    <Fragment>
      {list.content.map((item) => (
        <CatatlogListTd
          key={`CatalogListTd${item.catalogueId}`}
          data={item}
          {...rest}
        />
      ))}
    </Fragment>
  );

  return (
    <Fragment>
      <CustomTable
        tableName="catalog-list"
        head={tableHeadings}
        content={tableContent}
        tableContainarClass="catalog-list"
        totalPages={list.totalPages}
      />
      {itemsCount && totalItems}
    </Fragment>
  );
}

function CatatlogListTd({ data, catalogItem, setCatalogItem }) {
  return (
    <Fragment>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={catalogItem.catalogueId === data.catalogueId}
            name={data.catalogueId}
            onChange={() => setCatalogItem(data)}
          />
          <span>{data.name}</span>
        </td>
        {/* <td>{data.owner}</td> */}
        <td>{data.version}</td>
        <td>{data.modifiedAt}</td>
      </tr>
    </Fragment>
  );
}

export default React.memo(CatalogList);
