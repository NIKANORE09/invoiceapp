import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import SideBar from "./components/SideBar";
import { datae } from "./data";

function App() {
  const [invoices, setInvoices] = useLocalStorage("invoices", datae);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <SideBar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        invoices={invoices}
        setInvoices={setInvoices}
      />
      <div className="ml-[110px]">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                invoices={invoices}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
            }
          />
          <Route
            path="/:id"
            element={<Invoice invoices={invoices} setInvoices={setInvoices} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
