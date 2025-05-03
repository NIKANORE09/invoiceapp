import { useState } from "react";
import { useLocalStorage } from '@uidotdev/usehooks'
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import SideBar from "./components/SideBar";
import { datae } from "./data";

function App() {
  const [invoices, setInvoices] = useLocalStorage('invoices', datae);

  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/" element={<Home invoices={invoices} />} />
        <Route path="/:id" element={<Invoice invoices={invoices} setInvoices={setInvoices} />} />
      </Routes>
    </>
  );
}

export default App;
