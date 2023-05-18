import PDFMerger from "pdf-merger-js/browser";
import React, { useEffect, useState } from "react";
import { charMap } from "./../utils/const.js";
import localFont from '@next/font/local';
const myFont = localFont({ src: '../pages/Ntpn-Regular.ttf' });
const helpedChars = {
  "λ": "clito",
  "φ": "poing féministe",
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
    <div className="p-4">
      <h1 className={`text-2xl text-center ${myFont.className} mb-2`}>générateur de slogan</h1>
      <div className="text-center">

        <input
          className="max-w-2xl mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          debounceTimeout={300}
          onChange={handleChange}
          value={inputValue}
        />
      </div>
      {errors.length > 0 && (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-2">
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
      <div className="text-center">
        <p className="mb-2">Aide à la saisie (cliquez pour ajouter)</p>
        <ul className="inline-grid grid-cols-3 gap-2 mb-8">
          {Object.keys(helpedChars).map((c) => {
            return (
              <li className={`${myFont.className} bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
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

      <h1 className={`tracking-wide text-3xl ${myFont.className} text-center mb-8 leading-relaxed`}>{inputValue}</h1>

      <div className="text-center">
        {files.length > 0 && (
          <div className="inline-grid grid-cols-2 gap-2">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={handlePrint}>
              <svg class="fill-current w-4 h-4 mr-2" viewBox="0 0 20 20">
                <path d="M17.453,12.691V7.723 M17.453,12.691V7.723 M1.719,12.691V7.723 M18.281,12.691V7.723 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M7.309,13.312h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,13.312,7.309,13.312 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M16.625,6.066h-1.449V3.168c0-0.228-0.186-0.414-0.414-0.414H5.238c-0.228,0-0.414,0.187-0.414,0.414v2.898H3.375c-0.913,0-1.656,0.743-1.656,1.656v4.969c0,0.913,0.743,1.656,1.656,1.656h1.449v2.484c0,0.228,0.187,0.414,0.414,0.414h9.523c0.229,0,0.414-0.187,0.414-0.414v-2.484h1.449c0.912,0,1.656-0.743,1.656-1.656V7.723C18.281,6.81,17.537,6.066,16.625,6.066 M5.652,3.582h8.695v2.484H5.652V3.582zM14.348,16.418H5.652v-4.969h8.695V16.418z M17.453,12.691c0,0.458-0.371,0.828-0.828,0.828h-1.449v-2.484c0-0.228-0.186-0.414-0.414-0.414H5.238c-0.228,0-0.414,0.186-0.414,0.414v2.484H3.375c-0.458,0-0.828-0.37-0.828-0.828V7.723c0-0.458,0.371-0.828,0.828-0.828h13.25c0.457,0,0.828,0.371,0.828,0.828V12.691z M7.309,13.312h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,13.312,7.309,13.312M7.309,15.383h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,15.383,7.309,15.383 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555"></path>
              </svg><span>imprimer</span>
            </button>
            <a className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" href={`${mergedPdfUrl}`} download>
              <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
              <span>télécharger</span>
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
    </div>
  );
};

export default Merger;
