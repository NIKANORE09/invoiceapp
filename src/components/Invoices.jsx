import React from "react";
import { transportfromDate } from "../utils/utils";
import { Link } from "react-router-dom";

export default function Invoices({ invoices }) {
  console.log(invoices)
  return (
    <div className="w-[730px] mt-[64px] h-screen   mx-auto flex flex-col gap-5 cursor-pointer ">
      
      
    {Array.isArray(invoices) &&
  invoices.map((el) => (
    <Link
      to={`/${el.id}`}
      className="text-[var(--gray-400)] bg-[var(--background)] rounded-xl p-[28px] font-bold shadow-md flex gap-5"
      key={el.id}
    >
      <h2># {el.id}</h2>
      <h2>{transportfromDate(el.paymentDue)}</h2>
      <h2>{el.clientName}</h2>
    </Link>
))}
    </div>
  );
}
