import React from "react";
import "../CSS/Delivery.css";

function Delivery({ index, timeString, kind, manName, where }) {
  let manDiv = <div></div>;
  if (manName !== "") {
    manDiv = <div>배달원: {manName}</div>;
  }
  return (
    <div className="delivery">
      <div>
        {index + 1}. {timeString}
      </div>
      <div>상태: {kind}</div>
      <div>위치: {where}</div>
      {manDiv}
    </div>
  );
}
export default Delivery;
