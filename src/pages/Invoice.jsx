import React from "react";
import { useNavigate, useParams, } from "react-router-dom";



export default function Invoice({ invoices, setInvoices  }) {
  const params = useParams()
  const index = invoices.findIndex(el => el.id === params.id);
  const invoice = invoices[index]
  const navigate = useNavigate()
  const heandleDelete = () => {
    const filteredData = invoices.filter(el => el.id !== params.id)
    setInvoices(filteredData)
    navigate('/')
}
  
  
  return (
    <div className=" bg-[var(--BG-999)] w-100% h-100% mx-auto" >
      <div className="mx-auto" >
      <button onClick={heandleDelete} className="bg-[#FF9797]  rounded-[24px] mx-auto font-bold h-[48px] p-[13px] cursor-pointer  flex">Delete</button>
      </div>
      <div className="mt-[65px] w-[730px] h-[631px] bg-[var(--background)] rounded-xl shadow-md mx-auto">
      <h2>{invoice.id}</h2>
      <h2>{invoice.senderAddress.street}</h2>
      <h2>{invoice.createdAt}</h2>
      <h2>{invoice.paymentDue}</h2>
      <h2>{invoice.clientName}</h2>
      </div>
      
    </div>
  );
}
