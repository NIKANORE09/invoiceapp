import { useState } from "react";
import Header from "../components/Header";
import Invoices from "../components/Invoices";
import "./Home.css";

function Home({ invoices }) {
  const ChangeTheme = () => {
    document.documentElement.classList.toggle("dark");
  };
  return (
    <div className="bg-[var(--BG-999)]">
      <Header />

      <Invoices invoices={invoices} />

      {/* <button className="px-4 py-2 bg-[var(--btn)]" onClick={ChangeTheme}>
        dark/light
      </button> */}
    </div>
  );
}

export default Home;
