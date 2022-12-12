import React, { Fragment } from "react";
import { Tabs, Tab } from "react-bootstrap";

function tabView({ id, tabsList, setItemData }) {

  return (
    <Fragment>
      <div className="w-100 px-0 pt-md-4 pt-3 catelog-item">
        <div className="head  px-3 py-1 text-center">
          <div className="font14">
            {id}
            <button
              onClick={() => setItemData({})}
              className="px-1 txt_gray btn btn-sm"
            >
              &#x2715;
            </button>
          </div>
        </div>
        <Tabs defaultActiveKey={tabsList[0].id} className="catelog-tabs font14">
          {tabsList.map((item) => (
            <Tab
              key={`catelogTabss${item.id}`}
              eventKey={item.id}
              title={item.title}
            >
              {item.content}
            </Tab>
          ))}
        </Tabs>
      </div>
    </Fragment>
  );
}

export default tabView;
