import React from "react";
import { list } from "./List";

export const Item: React.FC<list> = ({ name, locations }) => {
  return (
    <div className="px-3 py-3 cursor-pointer">
      <h1>이름 : {name}</h1>
      <h2>지역 : {locations}</h2>
    </div>
  );
};
