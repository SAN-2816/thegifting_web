import React from "react";
import "../CSS/Info.css";

function Info({ invoiceNo, receiverName, receiverAddr, itemName }) {
  return (
    <div className="info">
      <div>운송장 번호: {invoiceNo}</div>
      <div>받는 사람: {receiverName}</div>
      <div>수령 주소: {receiverAddr}</div>
      <div>주문 상품: {itemName}</div>
    </div>
  );
}
export default Info;
