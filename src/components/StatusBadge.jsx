import React from "react";

export default function StatusBadge({ status }) {
  let bgColor = "";
  let textColor = "";
  let dotColor = "";

  switch (status) {
    case "paid":
      bgColor = "bg-green-100";
      textColor = "text-green-700";
      dotColor = "bg-green-700";
      break;
    case "pending":
      bgColor = "bg-orange-100";
      textColor = "text-orange-600";
      dotColor = "bg-orange-600";
      break;
    case "draft":
      bgColor = "bg-gray-200";
      textColor = "text-gray-700";
      dotColor = "bg-gray-700";
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-700";
      dotColor = "bg-gray-700";
  }

  return (
    <div
      className={`flex items-center gap-2 w-[104px] h-[40px] pb-[12px] pl-[18px] pt-[14px] pr-[19px] rounded-[6px] font-bold text-sm ${bgColor} ${textColor}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
}