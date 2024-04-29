import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { list } from "./List";

interface EditProps {
  name: string;
  locations: string;
}
export const Edit: React.FC<EditProps> = ({ name, locations }) => {
  const queryClient = useQueryClient();

  const handleAddItem = (name: string, locations: string) => {
    const id = name + locations;
    const onData = queryClient.getQueryData<list[] | undefined>(["addItem"]);

    const newData = [...(onData || [])];
    newData.push({ name, locations, id });
    queryClient.setQueryData(["addItem"], newData);
  };

  return (
    <div>
      <h1> 이름 : {name}</h1>
      <h2>지역 : {locations}</h2>
      <button
        onClick={() => handleAddItem(name, locations)}
        className=" border-2 border-blue-600 rounded-md px-2 py-1"
      >
        추가하기
      </button>
    </div>
  );
};
