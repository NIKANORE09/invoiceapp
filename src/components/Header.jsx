import React, { useState, useEffect, useRef } from "react";

export default function Header({
  invoices,
  setFilteredInvoices,
  setShowSidebar,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (selectedFilter === "all") {
      setFilteredInvoices(invoices);
    } else {
      const filtered = invoices.filter(
        (invoice) => invoice.status === selectedFilter
      );
      setFilteredInvoices(filtered);
    }
  }, [selectedFilter, invoices, setFilteredInvoices]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);
  };

  return (
    <header className="w-[730px] mx-auto pt-[64px] flex justify-between items-center font-bold">
      <div>
        <h1 className="text-3xl text-[var(--black-900)]">Invoices</h1>
        <p className="text-sm text-[var(--gray-300)] mt-1">
          {invoices?.length > 0
            ? `${invoices.length} invoice${invoices.length !== 1 ? "s" : ""}`
            : "No invoices"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 text-sm text-[var(--black-900)] font-bold cursor-pointer"
          >
            Filter by status
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-2 w-48 rounded-lg shadow-lg bg-[var(--background)] py-2">
              <div
                className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:text-[var(--btn)]"
                onClick={() => handleFilterSelect("all")}
              >
                <input
                  type="checkbox"
                  checked={selectedFilter === "all"}
                  onChange={() => {}}
                  className="h-4 w-4 accent-[var(--btn)]"
                />
                <span>All</span>
              </div>
              <div
                className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:text-[var(--btn)]"
                onClick={() => handleFilterSelect("paid")}
              >
                <input
                  type="checkbox"
                  checked={selectedFilter === "paid"}
                  onChange={() => {}}
                  className="h-4 w-4 accent-[var(--btn)]"
                />
                <span>Paid</span>
              </div>
              <div
                className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:text-[var(--btn)]"
                onClick={() => handleFilterSelect("pending")}
              >
                <input
                  type="checkbox"
                  checked={selectedFilter === "pending"}
                  onChange={() => {}}
                  className="h-4 w-4 accent-[var(--btn)]"
                />
                <span>Pending</span>
              </div>
              <div
                className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:text-[var(--btn)]"
                onClick={() => handleFilterSelect("draft")}
              >
                <input
                  type="checkbox"
                  checked={selectedFilter === "draft"}
                  onChange={() => {}}
                  className="h-4 w-4 accent-[var(--btn)]"
                />
                <span>Draft</span>
              </div>
            </div>
          )}
        </div>

        <button
          className="bg-[var(--btn)] text-white rounded-3xl px-4 py-2 flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setShowSidebar((prev) => !prev);
          }}
        >
          <span className="bg-white text-[var(--btn)] rounded-full w-6 h-6 flex items-center justify-center">
            +
          </span>
          New Invoice
        </button>
      </div>
    </header>
  );
}
