import React, { Fragment } from "react";

function ActionsListTd({ data }) {

    return (
        <Fragment>
            <tr>
                <td><input type="checkbox"  name={data.catalogueId} /> {data.number}</td>
                <td>{data.category}</td>
                <td>{data.product}</td>
                <td>{data.item}</td>
                <td>{data.version}</td>
            </tr>
        </Fragment>
    )
};

export default React.memo(ActionsListTd);