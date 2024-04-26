import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import request from "../api/request";

export const List = () => {
  const fallback: [] = [];
  const [list, setList] = useState(fallback);
  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = async () => {
    const result = await axios.get(request.dog);
    console.log(result);
    return setList(result.data);
  };

  return (
    <div>
      {list.map(() => (
        <div>hello</div>
      ))}
    </div>
  );
};
