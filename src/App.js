import Dashboard from "./components/Index.jsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRef } from "react";
import "./App.css";
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
    const width = doc.internal.pageSize.getWidth();

    doc.autotable({startY: 30})
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
  };

  return (
    <div className="flex-container">
      <div ref={Index}>
        <Dashboard />
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
