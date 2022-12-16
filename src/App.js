import Dashboard from "./components/Index.jsx";
import Form from "./components/form/forms.jsx"
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRef } from "react";
// import ReactToPrint, { useReactToPrint } from "react-to-print";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dummy from "./components/dummy.jsx";
function App() {
  // const Index = useRef();

  // const handleGeneratePdf = () => {
  //   const doc = new jsPDF({
  //     format: "a4",
  //     // putOnlyUsedFonts: true,
  //     orientation: "p",
  //     hotfixes: ["px_scaling"],
  //     unit: "px",
  //     compress: true,
  //   });

  //   // doc.setFont("Calibri", "normal");
  //   const width = doc.internal.pageSize.getWidth();
    
  //   // doc.autotable({startY: 30})
  //   doc.html(Index.current, {
  //     autoPaging: "text",
  //     width: width,
  //     margin: 5,
  //     windowWidth: width,
  //     async callback(doc) {
  //       doc.save("document");
  //     },
  //   });
  // };

  // const handleGeneratePdf = useReactToPrint({
  //   content: () => Index.current,
  // })

  return (
    <div className="flex-container">
      <Routes>
        {/* <Route path="/forms" element={<Form/>}/> */}
        <Route path="/forms" element={<Dummy/>}/>
        <Route path="/" element={<Dashboard/>}/>
        {/* <Route path="/" element={
      <ReactToPrint>
      <div ref={Index}>
        <Dashboard />
      </div>
      </ReactToPrint>
        }/> */}
      </Routes>
      
    </div>
  );
}

export default App;
