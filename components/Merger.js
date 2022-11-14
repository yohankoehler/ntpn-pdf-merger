import PDFMerger from "pdf-merger-js/browser";
import React, { useEffect, useState } from "react";

const charMap = {
  a: "A",
  à: "à",
  â: "â",
  b: "B",
  c: "C",
  ç: "C",
  d: "D",
  e: "E",
  é: "é",
  è: "è",
  ê: "ê",
  f: "F",
  g: "G",
  h: "H",
  i: "I",
  î: "î",
  ï: "ï",
  j: "J",
  k: "K",
  l: "L",
  m: "M",
  n: "N",
  o: "O",
  ô: "ô",
  p: "P",
  q: "Q",
  r: "R",
  s: "S",
  t: "T",
  u: "U",
  û: "û",
  v: "V",
  w: "W",
  x: "X",
  y: "Y",
  z: "Z",
  "?": "interro",
  "'": "apostrophe",
  "%": "pourcentage",
  "/": "barre oblique",
  ":": "deuxpoints",
  "#": "hashtag",
  ".": "point",
  "!": "pt exclamation",
  ",": "virgule",
  "-": "tiret",
  "=": "égal",
  "≠": "inégal",
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  "♈": "clito",
  "✊": "poing féministe",
};

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

    console.log("inputValue", inputValue);
  };

  const handleCharlistClick = (char) => {
    setInputValue(inputValue + char);
  };

  useEffect(() => {
    const finalFiles = [];
    const finalErrors = [];
    for (let c of inputValue.replace(/\s/g, "")) {
      console.log(
        "loading",
        c,
        `${window.location.protocol}//${window.location.host}/pdfs/${
          charMap[c.toLowerCase()]
        }.pdf`
      );

      charMap[c.toLowerCase()]
        ? finalFiles.push(
            `${window.location.protocol}//${window.location.host}/pdfs/${
              charMap[c.toLowerCase()]
            }.pdf`
          )
        : finalErrors.push(c);
    }
    setFiles(finalFiles);
    setErrors(finalErrors);
  }, [inputValue]);

  useEffect(() => {
    const render = async () => {
      console.log("pdfsss", files.files);

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

    () => setMergedPdfUrl({});
  }, [files, setMergedPdfUrl, errors]);

  return (
    <>
      <input
        type="text"
        onChange={handleChange}
        style={{ marginBottom: "1rem", width: "500px" }}
        value={inputValue}
      />
      <div>
        Aide à la saisie (clickez pour ajouter)
        <ul className="specialCharsList">
          {Object.keys(helpedChars).map((c) => {
            return (
              <li
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

        {!mergedPdfUrl ? (
          <>Loading</>
        ) : (
          <iframe
            height={800}
            src={`${mergedPdfUrl}`}
            title="pdf-viewer"
            width="100%s"
          ></iframe>
        )}
      </div>
    </>
  );
};

export default Merger;
