import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Sun, Moon } from "lucide-react";

export default function SideBar({
  showSidebar,
  setShowSidebar,
  invoices,
  setInvoices,
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + 30);
  const formattedDueDate = dueDate.toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    id: `RT${Math.floor(Math.random() * 10000)}`.padStart(6, "0"),
    createdAt: formattedDate,
    paymentDue: formattedDueDate,
    description: "",
    paymentTerms: 30,
    clientName: "",
    clientEmail: "",
    status: "draft",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [
      {
        name: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ],
    total: 0,
  });

  const calculateItemTotal = (item) => {
    return item.quantity * item.price;
  };

  const calculateInvoiceTotal = (items) => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]:
        field === "quantity" || field === "price" ? Number(value) : value,
    };

    if (field === "quantity" || field === "price") {
      updatedItems[index].total =
        updatedItems[index].quantity * updatedItems[index].price;
    }

    const newTotal = calculateInvoiceTotal(updatedItems);

    setFormData({
      ...formData,
      items: updatedItems,
      total: newTotal,
    });
  };

  const addNewItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          name: "",
          quantity: 1,
          price: 0,
          total: 0,
        },
      ],
    });
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    const newTotal = calculateInvoiceTotal(updatedItems);

    setFormData({
      ...formData,
      items: updatedItems,
      total: newTotal,
    });
  };

  const handleSubmit = (status) => {
    const newInvoice = {
      ...formData,
      status: status,
      id: formData.id,
    };

    setInvoices([...invoices, newInvoice]);
    setShowSidebar(false);

    setFormData({
      id: `RT${Math.floor(Math.random() * 10000)}`.padStart(6, "0"),
      createdAt: formattedDate,
      paymentDue: formattedDueDate,
      description: "",
      paymentTerms: 30,
      clientName: "",
      clientEmail: "",
      status: "draft",
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [
        {
          name: "",
          quantity: 1,
          price: 0,
          total: 0,
        },
      ],
      total: 0,
    });
  };

  const handleDiscard = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <div className="fixed z-11 pt-0 pl-0 w-[100px] h-full bg-[var(--gray-600)] rounded-r-3xl"></div>
      <div className="fixed z-30 pt-4 pl-4 w-[100px] h-full bg-[var(--gray-600)] rounded-r-3xl flex flex-col items-center justify-start gap-4">
        <button
          onClick={toggleDarkMode}
          className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>
      </div>
      {showSidebar && (
        <div className="fixed inset-0 z-20 w-[800px] bg-[var(--gray-600)] bg-opacity-30 backdrop-blur-sm ">
          <div className="flex h-full">
            <div className="w-[110px]"></div>

            <div className="w-[719px] bg-[var(--background)] h-full overflow-y-auto p-14">
              <h1 className="text-2xl font-bold mb-10">New Invoice</h1>

              <form className="space-y-6">
                <div>
                  <h4 className="text-[var(--btn)] font-bold mb-6">
                    Bill From
                  </h4>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-[var(--gray-300)] mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="senderAddress.street"
                        value={formData.senderAddress.street}
                        onChange={handleChange}
                        className="w-full p-4 text-[var(--text)]  border border-[var(--gray-200)] rounded-md bg-[var(--background)]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm text-[var(--gray-300)] mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="senderAddress.city"
                          value={formData.senderAddress.city}
                          onChange={handleChange}
                          className="w-full p-4 text-[var(--text)]  border border-[var(--gray-200)] rounded-md bg-[var(--background)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--gray-300)] mb-2">
                          Post Code
                        </label>
                        <input
                          type="text"
                          name="senderAddress.postCode"
                          value={formData.senderAddress.postCode}
                          onChange={handleChange}
                          className="w-full p-4 border border-[var(--gray-200)] text-[var(--text)]  rounded-md bg-[var(--background)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--gray-300)] mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          name="senderAddress.country"
                          value={formData.senderAddress.country}
                          onChange={handleChange}
                          className="w-full p-4 border border-[var(--gray-200)] text-[var(--text)]  rounded-md bg-[var(--background)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[var(--btn)] font-bold mb-6">Bill To</h4>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-[var(--gray-300)] mb-2">
                        Client's Name
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        className="w-full p-4 border border-[var(--gray-200)] text-[var(--text)]  rounded-md bg-[var(--background)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[var(--gray-300)] mb-2">
                        Client's Email
                      </label>
                      <input
                        type="email"
                        name="clientEmail"
                        value={formData.clientEmail}
                        onChange={handleChange}
                        className="w-full p-4 border border-[var(--gray-200)] text-[var(--text)]  rounded-md bg-[var(--background)]"
                        placeholder="e.g. email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[var(--gray-300)] mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="clientAddress.street"
                        value={formData.clientAddress.street}
                        onChange={handleChange}
                        className="w-full p-4 border text-[var(--text)]  border-[var(--gray-200)] rounded-md bg-[var(--background)]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm text-[var(--gray-300)] mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="clientAddress.city"
                          value={formData.clientAddress.city}
                          onChange={handleChange}
                          className="w-full p-4 border text-[var(--text)]  border-[var(--gray-200)] rounded-md bg-[var(--background)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--gray-300)] mb-2">
                          Post Code
                        </label>
                        <input
                          type="text"
                          name="clientAddress.postCode"
                          value={formData.clientAddress.postCode}
                          onChange={handleChange}
                          className="w-full p-4 border border-[var(--gray-200)] text-[var(--text)]  rounded-md bg-[var(--background)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--gray-300)] mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          name="clientAddress.country"
                          value={formData.clientAddress.country}
                          onChange={handleChange}
                          className="w-full p-4 border border-[var(--gray-200)] text-[var(--text)]  rounded-md bg-[var(--background)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[var(--gray-300)] mb-2">
                      Invoice Date
                    </label>
                    <input
                      type="date"
                      name="createdAt"
                      value={formData.createdAt}
                      onChange={handleChange}
                      className="w-full p-4 border border-[var(--gray-200)] text-[var(--text)]  rounded-md bg-[var(--background)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[var(--gray-300)] mb-2">
                      Payment Terms
                    </label>
                    <select
                      name="paymentTerms"
                      value={formData.paymentTerms}
                      onChange={(e) => {
                        const terms = Number(e.target.value);
                        const newDueDate = new Date(formData.createdAt);
                        newDueDate.setDate(newDueDate.getDate() + terms);
                        const newFormattedDueDate = newDueDate
                          .toISOString()
                          .split("T")[0];

                        setFormData({
                          ...formData,
                          paymentTerms: terms,
                          paymentDue: newFormattedDueDate,
                        });
                      }}
                      className="w-full p-4 border border-[var(--gray-200)]  text-[var(--text)] rounded-md bg-[var(--background)]"
                    >
                      <option value="1">Net 1 Day</option>
                      <option value="7">Net 7 Days</option>
                      <option value="14">Net 14 Days</option>
                      <option value="30">Net 30 Days</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[var(--gray-300)] mb-2">
                    Project Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-4 border border-[var(--gray-200)] text-[var(--text)] rounded-md bg-[var(--background)]"
                    placeholder="e.g. Graphic Design Service"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[var(--gray-400)] mb-4">
                    Item List
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-4 mb-2 text-sm text-[var(--gray-300)]">
                      <div className="col-span-5">Item Name</div>
                      <div className="col-span-1">QTY</div>
                      <div className="col-span-3">Price</div>
                      <div className="col-span-2">Total</div>
                      <div className="col-span-1"></div>
                    </div>

                    {formData.items.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-12 gap-4 items-center"
                      >
                        <div className="col-span-5  text-[var(--text)]">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) =>
                              handleItemChange(index, "name", e.target.value)
                            }
                            className="w-full p-4 border border-[var(--gray-200)]  text-[var(--text)]  rounded-md bg-[var(--background)]"
                          />
                        </div>
                        <div className="col-span-1 ">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            min="1"
                            className="w-full p-4 border border-[var(--gray-200)] text-[var(--text)]  rounded-md bg-[var(--background)]"
                          />
                        </div>
                        <div className="col-span-3">
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) =>
                              handleItemChange(index, "price", e.target.value)
                            }
                            min="0"
                            className="w-full p-4 border text-[var(--text)]  border-[var(--gray-200)] rounded-md bg-[var(--background)]"
                          />
                        </div>
                        <div className="col-span-2 text-[var(--gray-300)] p-4">
                          £{item.total.toFixed(2)}
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-[var(--gray-300)] hover:text-red-500"
                          >
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
                            >
                              <path d="M18 6L6 18M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addNewItem}
                      className="w-full bg-[#F9FAFE] text-[var(--gray-300)] font-bold py-3 rounded-3xl mt-4 hover:bg-[#DFE3FA] cursor-pointer"
                    >
                      + Add New Item
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-10 flex justify-between">
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="bg-[#F9FAFE] text-[var(--gray-300)] font-bold py-4 px-6 rounded-3xl cursor-pointer"
                >
                  Discard
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleSubmit("draft")}
                    className="bg-[#373B53] text-[var(--gray-200)] font-bold py-4 px-6 rounded-3xl cursor-pointer"
                  >
                    Save as Draft
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmit("pending")}
                    className="bg-[var(--btn)] text-white font-bold py-4 px-6 rounded-3xl cursor-pointer"
                  >
                    Save & Send
                  </button>
                </div>
              </div>
            </div>

            <div
              className="flex-grow cursor-pointer"
              onClick={() => setShowSidebar(false)}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
