import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { list } from "./List";

export const Mypage = () => {
  const [selectItem, setSelectItem] = useState<list>();
  const [onEdit, setOnEdit] = useState(false);
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(["addItem"]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (selectItem) {
        const updateData =
          Array.isArray(data) &&
          data?.map((item) =>
            item.id === selectItem.id ? { ...item, ...selectItem } : item
          );
        if (updateData) {
          queryClient.setQueryData(["addItem"], updateData);
          setOnEdit(false);
        }
      }
    },
  });

  const mypageRender = () => {
    if (!data) {
      return <div>추가된 아이템이 없습니다</div>;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectItem) {
      if (e.target.id === "name") {
        setSelectItem({ ...selectItem, name: e.target.value });
      } else if (e.target.id === "locations") {
        setSelectItem({ ...selectItem, locations: e.target.value });
      }
    }
  };
  console.log(selectItem);
  console.log(data);
  return (
    <div>
      <h1>Mypage</h1>
      {mypageRender()}
      <section className="grid grid-cols-3 py-3 overflow-scroll h-52">
        {Array.isArray(data) &&
          data?.map((item, index) => (
            <div key={index} className=" cursor-pointer">
              <h2>Name: {item.name}</h2>
              <h3>Location: {item.locations}</h3>
              <button
                onClick={() => {
                  setSelectItem(item);
                  setOnEdit(true);
                }}
                className=" border-2 border-blue-600 rounded-md px-2 py-1"
              >
                수정하기
              </button>
            </div>
          ))}
      </section>
      {selectItem && onEdit && (
        <div>
          <span>이름 : </span>
          <input
            type="text"
            value={selectItem.name}
            className="m-1 border-2 rounded-md px-1"
            onChange={handleChange}
            id="name"
          />
          <span>지역 : </span>
          <input
            type="text"
            value={selectItem.locations}
            className="m-1 border-2 rounded-md px-1"
            onChange={handleChange}
            id="locations"
          />
          <button
            className=" border-2 border-blue-600 rounded-md px-2 py-1"
            onClick={() => updateMutation.mutate()}
          >
            확인
          </button>
        </div>
      )}
      {updateMutation.isPending && <p>업데이트 중</p>}
      {updateMutation.isSuccess && <p>업데이트 완료</p>}
      {updateMutation.isError && <p>업데이트 실패</p>}
    </div>
  );
};
