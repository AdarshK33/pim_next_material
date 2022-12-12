import React from "react";

function List(props) {
  console.log("listValues", props);
  return (
    <>
      {props.listValues.map((item) => (
        <div className="each-member">
            <p className="each-member__name">{item.name}</p>
            <p className="each-member__email">{item.email}</p>
        </div>
      ))}
    </>
  );
}

export default List;
