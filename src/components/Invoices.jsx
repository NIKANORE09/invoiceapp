import React from "react";
import { transportfromDate } from "../utils/utils";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge.jsx";

export default function Invoices({ invoices }) {
  console.log(invoices);
  return (
    <div className="w-[730px] mt-[64px] h-screen mx-auto flex flex-col gap-5 cursor-pointer">
      {Array.isArray(invoices) &&
        invoices.map((el) => (
          <Link
            to={`/${el.id}`}
            key={el.id}
            className="grid grid-cols-[100px_140px_1fr_100px_100px] items-center text-[var(--gray-400)] bg-[var(--background)] rounded-xl px-[28px] py-[20px] font-bold shadow-md"
          >
            <div className="inline-flex">
              <h2 className="text-[var(--gray-300)]">#</h2>
              <h2>{el.id}</h2>
            </div>
            <h2 className="text-[var(--gray-300)]">
              {transportfromDate(el.paymentDue)}
            </h2>
            <h2 className="text-[var(--gray-300)]">{el.clientName}</h2>
            <h2 className="text-[var(--black-900)]">£{el.total}.00</h2>
            <StatusBadge status={el.status} />
          </Link>
        ))}
    </div>
  );
}
