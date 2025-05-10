import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge.jsx";

export default function Invoice({ invoices, setInvoices }) {
  const params = useParams();
  const index = invoices.findIndex((el) => el.id === params.id);
  const invoice = invoices[index];
  const navigate = useNavigate();

  const handleDelete = () => {
    const filteredData = invoices.filter((el) => el.id !== params.id);
    setInvoices(filteredData);
    navigate("/");
  };

  const markAsPaid = () => {
    const updatedInvoices = [...invoices];
    updatedInvoices[index] = { ...invoice, status: "paid" };
    setInvoices(updatedInvoices);
  };

  if (!invoice) {
    return <div className="text-center mt-10">Invoice not found</div>;
  }

  return (
    <div className="bg-[var(--bg-999)] w-100% h-100% mx-auto pt-[88px]">
      <div className="mx-auto flex p-[20px] rounded-[8px]  bg-[var(--gg)] gap-4 w-[730px] h-[88px] shadow-md items-center">
        <h2 className="text-[14px] text-[var(--gray-300)] justify-start pl-[13px]">
          Status
        </h2>
        <div className="pl-[13px]">
          <StatusBadge status={invoice.status} />
        </div>

        <div className="ml-auto inline-flex gap-[8px]">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="bg-[var(--btn)] bg-opacity-10 text-white  rounded-[24px] font-bold h-[48px] px-6 cursor-pointer"
            >
              Back
            </button>
          </div>

          {invoice.status !== "paid" && (
            <button
              onClick={markAsPaid}
              className="bg-green-500 text-white rounded-[24px] font-bold h-[48px] px-6 cursor-pointer"
            >
              Mark as Paid
            </button>
          )}

          <button
            onClick={handleDelete}
            className="bg-[#FF9797] text-white rounded-[24px] font-bold h-[48px] px-6 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="pb-[20px]">
        <div className="mt-[65px] w-[730px] h-[631px] bg-[var(--gg)] rounded-[8px] shadow-md mx-auto p-[50px]">
          <div className="inline-flex gap-[440px]">
            <div className="flex-col">
              <div className="inline-flex">
                <h1 className="text-[20px] text-[var(--gray-300)] font-extrabold">
                  #
                </h1>
                <h1 className="text-[20px] font-extrabold text-[var(--black-900)]">
                  {invoice.id}
                </h1>
              </div>
              <h2 className="text-[12px] text-[var(--gray-300)] font-bold pt-[7px]">
                {invoice.description}
              </h2>
            </div>
            <div className="text-[14px] text-[var(--gray-300)]">
              <h2>{invoice.senderAddress.street}</h2>
              <h2>{invoice.senderAddress.city}</h2>
              <h2>{invoice.senderAddress.postCode}</h2>
              <h2>{invoice.senderAddress.country}</h2>
            </div>
          </div>
          <div className="inline-flex gap-[118px]">
            <div>
              <h2 className="text-[14px] text-[var(--gray-300)]">
                Invoice Date
              </h2>
              <h2 className="text-[15px] font-extrabold text-[var(--gray-400)]">
                {invoice.createdAt}
              </h2>
              <h2 className="text-[14px] text-[var(--gray-300)] pt-[10px]">
                Payment Due
              </h2>
              <h2 className="text-[15px] font-extrabold text-[var(--gray-400)]">
                {invoice.paymentDue}
              </h2>
            </div>
            <div>
              <h2 className="text-[14px] text-[var(--gray-300)]">Bill To</h2>
              <h2 className="text-[17px] font-extrabold text-[var(--gray-400)]">
                {invoice.clientName}
              </h2>
              <h2 className="text-[14px] text-[var(--gray-300)]">
                {invoice.clientAddress.street}
              </h2>
              <h2 className="text-[14px] text-[var(--gray-300)]">
                {invoice.clientAddress.city}
              </h2>
              <h2 className="text-[14px] text-[var(--gray-300)]">
                {invoice.clientAddress.postCode}
              </h2>
              <h2 className="text-[14px] text-[var(--gray-300)]">
                {invoice.clientAddress.country}
              </h2>
            </div>
            <div>
              <h2 className="text-[14px] text-[var(--gray-300)]">Sent To</h2>
              <h2 className="text-[17px] font-extrabold text-[var(--gray-400)]">
                {invoice.clientEmail}
              </h2>
            </div>
          </div>
          <div className="w-[634px] h-[184px] bg-[var(--black-900)] rounded-t-[8px] p-[33px]">
            <div className="inline-flex gap-[60px]">
              <div className="flex-col">
                <h2 className="text-[17px] text-[var(--gray-300)]">
                  Item Name
                </h2>
                <h2>
                  {invoice.items.map((item, index) => (
                    <div
                      key={index}
                      className="pt-[13px] text-[17px] text-[var(--gray-400)]"
                    >
                      {item.name}
                    </div>
                  ))}
                </h2>
              </div>
              <div className="pl-[124px]">
                <h2 className="text-[17px] text-[var(--gray-300)]">QTY</h2>
                <h2>
                  {invoice.items.map((item, index) => (
                    <div
                      key={index}
                      className="pt-[13px] text-[17px] text-[var(--gray-300)]"
                    >
                      {item.quantity}
                    </div>
                  ))}
                </h2>
              </div>
              <div>
                <h2 className="text-[17px] text-[var(--gray-300)]">Price</h2>
                <h2 className="">
                  {invoice.items.map((item, index) => (
                    <div
                      key={index}
                      className="pt-[13px] text-[17px] text-[var(--gray-300)] font-semibold"
                    >
                      £ {item.price}.00
                    </div>
                  ))}
                </h2>
              </div>
              <div>
                <h2 className="text-[17px] text-[var(--gray-300)]">Total</h2>
                <h2 className="">
                  {invoice.items.map((item, index) => (
                    <div
                      key={index}
                      className="pt-[13px] text-[17px] text-[var(--gray-400)] font-semibold"
                    >
                      £ {item.total}.00
                    </div>
                  ))}
                </h2>
              </div>
            </div>
          </div>
          <div className="w-[634px] h-[80px] bg-[var(--gray-400)] rounded-b-[8px] p-[25px]">
            <div className="flex justify-between items-center text-white">
              <h2>Amount Due</h2>
              <h1 className="font-extrabold text-[24px]">
                £{invoice.total}.00
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
