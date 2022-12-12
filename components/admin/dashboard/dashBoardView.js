import React, { Fragment } from "react";

function DashBoardView() {

    return (
        <Fragment>
            <div className="w-100 row mx-0 p-0">
                <img src="/dashBoard1.png" alt="dashBoard1" className="p-0 mb-3" />
                <div className="col-md-4 ps-md-0 pe-md-5">
                    <img src="/dashBoard2.png" alt="dashBoard2" width="100%" />
                </div>
                <div className="col-md-4 ps-md-0 pe-md-5">
                    <img src="/dashBoard3.png" alt="dashBoard3" width="100%" />
                </div>
                <div className="col-md-4 pe-md-0 ps-md-5">
                    <img src="/dashBoard4.png" alt="dashBoard4" width="100%" />
                </div>
            </div>
        </Fragment>
    )
}

export default React.memo(DashBoardView)