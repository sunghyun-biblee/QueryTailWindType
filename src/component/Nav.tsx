import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="flex justify-end font-bold pt-5 pr-5 md:text-sm lg:text-lg">
      <ul className="text-blue-500 flex ">
        <li className="px-5">
          <Link to={"/"}>
            <span>메인</span>
          </Link>
        </li>
        <li className="px-5">
          <Link to={"list"}>
            <span>목록</span>
          </Link>
        </li>
        <li className="px-5">
          <Link to={"edit"}>
            <span>수정</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
