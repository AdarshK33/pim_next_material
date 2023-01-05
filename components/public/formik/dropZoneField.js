import React from "react";
import { useDropzone } from 'react-dropzone';
import folder from "../../../assets/icons/folder.svg";
import Image from 'next/image';

function DropZoneField({ setFieldValue, name }) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    if(acceptedFiles.length) setFieldValue(name, acceptedFiles)

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.name}
        </li>
    ));

    return (
        <section className="dropZone-container">
            <div {...getRootProps({ className: 'dropzone col-2 p-3 text-end align-self-center d-flex' })}>
                <input name={name} {...getInputProps()} />
             <div className="upload_blk">
                <div>
                <Image
              className="px-2"
			  src={folder}
			  alt="folder"
              width={40}
			  height={35}
              // onClick={() => {
              //   setShowBrandCreationForm(true)
              // }}
              />
                </div>
                <div>
                <p className="m-auto txt_gray">Upload test your document</p>

                </div>
                </div>   
           
            </div>
            {acceptedFiles.length > 0 && <div className="files-list">
                <ul>{files}</ul>
            </div>}
        </section>
    );
}
export default React.memo(DropZoneField)