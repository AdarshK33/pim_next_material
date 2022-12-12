import React, { Fragment, useState } from "react";
import SubmitButton from "../../public/formik/submitButton";
import UploadForm from "./uploadForm";

function CatalogEditView() {

    const [updaloadShow, setUploadShow] = useState(true);

    return (
        <Fragment>
            <div className="upload-container">
                <div className="p-3 bg-white border-bottom">
                    <div className="btn-container mx-auto">
                        <SubmitButton onClick={() => setUploadShow(true)} name="New Upload" type="button" className={`btn btn-sm btn-radius ${updaloadShow && "btn-blue"}`} />
                        <SubmitButton onClick={() => setUploadShow(false)} name="Recent" type="button" className={`btn btn-sm btn-radius ${!updaloadShow && "btn-blue"}`} />
                    </div>
                </div>
                {
                    updaloadShow ? <UploadForm /> : <UploadedList />
                }
            </div>
        </Fragment>
    )
};


function UploadedList() {

    const list = [
        { name: "abcd.pdf", time: "2m ago", size:"5mb" },
        { name: "120sad.pdf", time: "5m ago", size:"1.2mb" }
    ]

    return (
        <Fragment>
            {list.map((item, index) => <Fragment key={`recentUploadslist${index}`}>
                <div className="border-bottom p-2 bg-white d-flex justify-content-between font12">
                    <div className="">
                        <p className="mb-0">{item.name}</p>
                        <small>{item.time}</small>
                    </div>
                    <div className="">
                        <button className="btn btn-sm border py-0 px-3">{item.size}</button>    
                    </div>                    
                </div>
            </Fragment>)}
            <div className="p-3">

            </div>
        </Fragment>
    )
};

export default React.memo(CatalogEditView);