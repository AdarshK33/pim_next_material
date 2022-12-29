import React from "react";
import { useDropzone } from 'react-dropzone';

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
            <div {...getRootProps({ className: 'dropzone' })}>
                <input name={name} {...getInputProps()} />
                <p className="m-auto txt_gray">Upload your document</p>
            </div>
            {acceptedFiles.length > 0 && <div className="files-list">
                <ul>{files}</ul>
            </div>}
        </section>
    );
}
export default React.memo(DropZoneField)