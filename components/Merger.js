import PDFMerger from "pdf-merger-js/browser";
import React, { useEffect, useState } from "react";


const charMap = {
  a : 'A',
  b : 'B',
  c : 'C',
  d : 'D',
  e : 'E',
  f : 'F',
  g : 'G',
  h : 'H',
  i : 'I',
  î : 'î',
  ï : 'ï',
  j : 'J',
  k : 'K',
  l : 'L',
  m : 'M',
  n : 'N',
  o : 'O',
  p : 'P',
  q : 'Q',
  r : 'R',
  s : 'S',
  t : 'T',
  u : 'U',
  v : 'V',
  w : 'W',
  x : 'X',
  y : 'Y',
  z : 'Z',
  '?' : 'interro',
  '\'' : 'apostrophe',
  '%' : 'pourcentage',
  '0' : '0',
  '1' : '1',
  '2' : '2',
  '3' : '3',
  '4' : '4',
  '5' : '5',
  '6' : '6',
  '7' : '7',
  '8' : '8',
  '9' : '9',
}

// files: Array of PDF File or Blob objects
const Merger = () => {
  const [mergedPdfUrl, setMergedPdfUrl] = useState();
  const [files, setFiles] = useState([]);

  const merger = new PDFMerger();

  const handleChange = async (event) => {
    // console.log(event)
    const finalFiles = []
    for (let c of event.target.value.replace(/\s/g, '')) {
      console.log('loading', c, `${window.location.protocol}//${window.location.host}/pdfs/${charMap[c.toLowerCase()]}.pdf` )
      
      charMap[c.toLowerCase()] && finalFiles.push(`${window.location.protocol}//${window.location.host}/pdfs/${charMap[c.toLowerCase()]}.pdf`)
    }
    setFiles(finalFiles);

  }

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
  }, [files, setMergedPdfUrl]);

  return <>
    <input type="text" onChange={handleChange} />

  {!mergedPdfUrl ? 
    <>Loading</>
   : 
    <iframe
      height={800}
      src={`${mergedPdfUrl}`}
      title="pdf-viewer"
      width="100%s"
    ></iframe>
}
  </>
};

export default Merger;
