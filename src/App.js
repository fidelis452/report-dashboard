// import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Index.jsx";
import TableContent from "./components/content-table/TableContent.jsx";
import Introduction from "./components/Intro/Index.jsx";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import * as htmlToImage from "html-to-image";
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { useRef } from "react";
import "./App.css";
import { dblClick } from "@testing-library/user-event/dist/click.js";
function App() {
  const Index = useRef(null);

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      // putOnlyUsedFonts: true,
      orientation: "p",
      hotfixes: ["px_scaling"],
      unit: "px",
      compress: true,
    });

    doc.setFont("Calibri", "normal");
    // doc.text("*", )
    // doc.text("my name is",10, 10,{lineHeightFactor: 1.5})
    const width = doc.internal.pageSize.getWidth();
    doc.html(Index.current, {
      autoPaging: "text",
      width: width,
      margin: 5,
      windowWidth: width,
      x: 10,
      y: 10,
      async callback(doc) {
        doc.save("document");
      },
    });
    // doc.splitTextToSize(Index.current, {
    //   size: 10
    // })
  };

  return (
    <div className="flex-container">
      <div ref={Index}>
        <Dashboard />
        <TableContent/>
        {/* <Introduction /> */}
      </div>
      <div className="btn-classs">
        <button className="button" onClick={handleGeneratePdf}>
          Generate PDF
        </button>
      </div>
    </div>
  );
}

export default App;
