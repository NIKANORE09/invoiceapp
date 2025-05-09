import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge.jsx";

export default function Invoice({ invoices, setInvoices }) {
  const params = useParams();
  const index = invoices.findIndex((el) => el.id === params.id);
  const invoice = invoices[index];
  const navigate = useNavigate();
  const heandleDelete = () => {
    const filteredData = invoices.filter((el) => el.id !== params.id);
    setInvoices(filteredData);
    navigate("/");
  };

  return (
    <div className=" bg-[var(--BG-999)] w-100% h-100% mx-auto pt-[88px]">
      <div className="mx-auto flex  p-[20px] rounded-[8px] bg-[var(--background)] gap-4 bg w-[730px] h-[88px] shadow-md ">
        <h2 className="text-[14px] text-[var(--gray-300)] justify-start pt-[14px] pl-[13px]">
          Status
        </h2>
        <div className="pt-[5px] pl-[13px]">
          <StatusBadge status={invoice.status} />
        </div>
        <div className="pl-[310px]  inline-flex gap-[8px]">
          <div className="pl-[8px]">
            <button
              onClick={() => navigate(-1)}
              className="bg-[var(--btn)] text-white rounded-[24px] font-bold h-[48px] px-6 cursor-pointer "
            >
              Back
            </button>
          </div>
          <button
            onClick={heandleDelete}
            className="bg-[#FF9797] text-white rounded-[24px] font-bold h-[48px] px-6 cursor-pointer "
          >
            Delete
          </button>
        </div>
      </div>
      <div className="pb-[20px]">
        <div className=" mt-[65px] w-[730px] h-[631px] bg-[var(--background)] rounded-[8px] shadow-md mx-auto p-[50px]">
          <div className=" inline-flex gap-[440px]">
            <div className="flex-col">
              <div className=" inline-flex">
                <h1 className=" text-[20px] text-[var(--gray-300)] font-extrabold">
                  #
                </h1>
                <h1 className="text-[20px] font-extrabold text-[var(--black-900)]">
                  {invoice.id}
                </h1>
              </div>
              <h2 className=" text-[12px] text-[var(--gray-300)] font-bold pt-[7px]">
                {invoice.description}
              </h2>
            </div>
            <div className="text-[14px] text-[var(--gray-300)] ">
              <h2>{invoice.senderAddress.street}</h2>
              <h2>{invoice.senderAddress.city}</h2>
              <h2>{invoice.senderAddress.postCode}</h2>
              <h2>{invoice.senderAddress.country}</h2>
            </div>
          </div>
          <div className="inline-flex gap-[118px]">
            <div>
              <h2 className="text-[14px] text-[var(--gray-300)] ">
                Invoice Date
              </h2>
              <h2 className="text-[15px] font-extrabold text-[var(--black-900)]">
                {invoice.createdAt}
              </h2>
              <h2 className="text-[14px] text-[var(--gray-300)] pt-[10px] ">
                Payment Due
              </h2>
              <h2 className="text-[15px] font-extrabold text-[var(--black-900)]">
                {invoice.paymentDue}
              </h2>
            </div>
            <div>
              <h2 className="text-[14px] text-[var(--gray-300)]  ">Bill To</h2>
              <h2 className="text-[17px] font-extrabold text-[var(--black-900)]">
                {invoice.clientName}
              </h2>
              <h2 className="text-[14px] text-[var(--gray-300)] ">
                {invoice.clientAddress.street}
              </h2>
              <h2 className="text-[14px] text-[var(--gray-300)] ">
                {invoice.clientAddress.city}
              </h2>
              <h2 className="text-[14px] text-[var(--gray-300)] ">
                {invoice.clientAddress.postCode}
              </h2>
              <h2 className="text-[14px] text-[var(--gray-300)] ">
                {invoice.clientAddress.country}
              </h2>
            </div>
            <div>
              <h2 className="text-[14px] text-[var(--gray-300)] ">Sent To</h2>
              <h2 className="text-[17px] font-extrabold text-[var(--black-900)]">
                {invoice.clientEmail}
              </h2>
            </div>
          </div>
          <div className="w-[634px] h-[184px] bg-[#F9FAFE] rounded-t-[8px] p-[33px]">
            <div className="inline-flex gap-[60px]">
              <div className="flex-col">
                <h2 className="text-[17px] text-[var(--gray-300)] ">
                  Item Name
                </h2>
                <h2>
                  {invoice.items.map((item, index) => (
                    <div key={index} className="pt-[13px] text-[17px] ">
                      {item.name}
                    </div>
                  ))}
                </h2>
              </div>
              <div className="pl-[124px]">
                <h2 className="text-[17px] text-[var(--gray-300)] ">QTY</h2>
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
                <h2 className="text-[17px] text-[var(--gray-300)] ">Price</h2>
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
                {" "}
                <h2 className="text-[17px] text-[var(--gray-300)] ">Total</h2>
                <h2 className="">
                  {invoice.items.map((item, index) => (
                    <div
                      key={index}
                      className="pt-[13px] text-[17px] font-semibold"
                    >
                      £ {item.total}.00
                    </div>
                  ))}
                </h2>
              </div>
            </div>
          </div>
          <div className="w-[634px] h-[80px] bg-[#373B53] rounded-b-[8px] p-[25px]">
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
