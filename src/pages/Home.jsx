import { useState } from "react";
import Header from "../components/Header";
import Invoices from "../components/Invoices";

function Home({ invoices, showSidebar, setShowSidebar }) {
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);

  const changeTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="bg-[var(--BG-999, --background)] ">
      <Header
        invoices={invoices}
        setFilteredInvoices={setFilteredInvoices}
        setShowSidebar={setShowSidebar}
      />

      <Invoices invoices={filteredInvoices} />
    </div>
  );
}

export default Home;
