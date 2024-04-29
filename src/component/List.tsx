import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import request, { fetchList, prefetchList } from "../api/request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { Item } from "./Item";
import { Edit } from "./Edit";

export interface list {
  name: string;
  locations: string;
  id: string | undefined;
}
export const List = () => {
  const [type, setType] = useState<string>("dog");
  const queryClient = useQueryClient();
  const [selectItem, setSelectItem] = useState<list>();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["list", type],
    queryFn: () => fetchList(type),
  });

  // const updateMutatinon=useMutation({
  //   mutationFn:
  // })

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["list", type],
      queryFn: () => prefetchList(type),
    });
  }, [type, queryClient]);

  if (isLoading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <span>{error.toString()}</span>
      </div>
    );
  }
  console.log(data);
  console.log(type);
  return (
    <div>
      <nav>
        <button
          onClick={() => setType("dog")}
          className="text-blue-600  h-5 text-base px-3"
        >
          강아지
        </button>
        <button
          onClick={() => setType("cat")}
          className="text-blue-600  h-5 text-base px-3"
        >
          고양이
        </button>
      </nav>
      <ul className="grid grid-cols-3 py-3 overflow-scroll h-52">
        {data.map((item: list, index: number) => (
          <li onClick={() => setSelectItem(item)} className="cursor-pointer">
            <h1>이름 : {item.name}</h1>
            <h2>지역 : {item.locations[0]}</h2>
          </li>
        ))}
      </ul>
      {selectItem && (
        <Edit name={selectItem.name} locations={selectItem.locations}></Edit>
      )}
    </div>
  );
};
