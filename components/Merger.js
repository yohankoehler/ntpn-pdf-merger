import PDFMerger from "pdf-merger-js/browser";
import React, { useEffect, useState } from "react";
import { DebounceInput } from 'react-debounce-input';
import Preview from "./Preview";
import {charMap} from "./../utils/const.js";

const helpedChars = {
  "♈": "clito",
  "✊": "poing féministe",
  "≠": "inégal",
};

const Merger = () => {
  const [mergedPdfUrl, setMergedPdfUrl] = useState();
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const merger = new PDFMerger();

  const handleChange = async (event) => {
    setInputValue(event.target.value);
  };

  const handleCharlistClick = (char) => {
    setInputValue(inputValue + char);
  };

  const handlePrint = () => {
    var iframe = document.getElementsByTagName("iframe")[0];
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };

  useEffect(() => {
    const finalFiles = [];
    const finalErrors = [];
    for (let c of inputValue.replace(/\s/g, "")) {
      charMap[c.toLowerCase()]
        ? finalFiles.push(
          `${window.location.protocol}//${window.location.host}/pdfs/${charMap[c.toLowerCase()]
          }.pdf`
        )
        : finalErrors.push(c);
    }
    setFiles(finalFiles);
    setErrors(finalErrors);
  }, [inputValue]);

  useEffect(() => {
    const render = async () => {
      for (const file of files) {
        await merger.add(file);
      }

      const mergedPdf = await merger.saveAsBlob();
      const url = URL.createObjectURL(mergedPdf);

      return setMergedPdfUrl(url);
    };

    render().catch((err) => {
      throw err;
    });

    () => setMergedPdfUrl(undefined);
  }, [files, setMergedPdfUrl, errors]);

  return (
    <>
      <Preview size="m" sentence={"générateur de slogan"} />

      <DebounceInput
        type="text"
        debounceTimeout={300}
        onChange={handleChange}
        style={{  width: "500px", maxWidth:"100%", margin: "0 1rem 1rem 1rem" }}
        value={inputValue}
      />

      <div>
        Aide à la saisie (cliquez pour ajouter)
        <ul className="specialCharsList">
          {Object.keys(helpedChars).map((c) => {
            return (
              <li className="action"
                onClick={() => {
                  handleCharlistClick(c);
                }}
              >
                {c}
              </li>
            );
          })}
        </ul>
      </div>

      <Preview sentence={inputValue} />

      <div className="layout">
        {errors.length > 0 && (
          <div className="errorChars">
            les charactères suivants ne sont pas disponibles, essayez d'en
            utiliser d'autres
            <ul className="errorList">
              {errors.map((c) => (
                <li className="errorItem">
                  <kbd>{c}</kbd>&nbsp;,&nbsp;&nbsp;
                </li>
              ))}
            </ul>
          </div>
        )}

        {files.length > 0 && (
          <div className="actions">
            <button className="action" onClick={handlePrint}>
              🖨️ imprimer
            </button>
            <a className="action" href={`${mergedPdfUrl}`} download>
              ⬇️ télécharger
            </a>
          </div>
        )}

        {!mergedPdfUrl ? (
          <>Loading</>
        ) : (
          <iframe
            height="0"
            src={`${mergedPdfUrl}`}
            title="pdf-viewer"
            width="0"
          ></iframe>
        )}
      </div>
    </>
  );
};

export default Merger;
