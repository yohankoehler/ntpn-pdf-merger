
import {charMap} from "./../utils/const.js";
import React, { useEffect, useState } from "react";


const Preview = ({ sentence, size }) => {

    

    const [files, setFiles] = useState([]);
    useEffect(() => {
        const finalFiles = [];
        const finalErrors = [];
        for (let c of sentence) {
          charMap[c.toLowerCase()]
            ? finalFiles.push(
                `${window.location.protocol}//${window.location.host}/images/${
                  charMap[c.toLowerCase()]
                }.jpg`
              )
            : c === " " ? finalFiles.push("space") : finalErrors.push(c);
        }
        setFiles(finalFiles);
        // setErrors(finalErrors);
      }, [sentence]);

    return <div className={`preview-container preview-container-${ size || 'xl'}`}>
        {files.map((file)=> file === "space" ? <div className="preview-item-space"></div> : <img className="preview-item" src={file} />)}
    </div>
}

export default Preview