import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { list } from "./List";

export const Mypage = () => {
  const [selectItem, setSelectItem] = useState<list>();
  const [onEdit, setOnEdit] = useState(false);
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(["addItem"]);

  const updateMutation = useMutation({
    mutationKey: ["mutateItem"],
    mutationFn: delay,
    onSuccess: () => {
      setOnEdit(false);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ["addItem"] });
    },
    onMutate: async (selectItem: list) => {
      // 낙관적 업데이트: 변경 전 데이터 저장
      const previousData: list[] | undefined = queryClient.getQueryData([
        "addItem",
      ]);

      // 변경된 데이터를 즉시 적용하여 UI 갱신
      queryClient.setQueryData(["addItem"], (oldData: list[] | undefined) => {
        // 여기서 oldData는 이전 상태의 데이터입니다.
        if (oldData) {
          const newData = oldData.map((item) =>
            item.id === selectItem.id ? { ...item, ...selectItem } : item
          );
          return newData;
        }
        return oldData;
      });

      // 변경 전 데이터를 반환하여 롤백시 사용
      return { previousData };
    },

    // 변경 전 데이터를 반환하여 롤백시 사용
  });

  async function delay() {
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          if (selectItem) {
            const updatedData =
              Array.isArray(data) &&
              data.map((item) =>
                item.id === selectItem.id ? { ...item, ...selectItem } : item
              );
            if (updatedData) {
              queryClient.setQueryData(["addItem"], updatedData);
              setOnEdit(false);
            }
          }
          resolve();
        }, 3000); // 3초 뒤에 실행되도록 설정
      });
      // 여기까지 오류 없이 실행되었을 경우에만 성공으로 간주
      return Promise.resolve();
    } catch (error) {
      // 오류가 발생한 경우 여기서 처리
      console.error("오류 발생:", error);
      return Promise.reject(error);
    }
  }

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

  console.log(updateMutation);
  console.log("ispending", updateMutation.isPending);
  console.log("isSuccess", updateMutation.isSuccess);

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
                  updateMutation.reset();
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
      {selectItem && (
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
            onClick={() => updateMutation.mutate(selectItem)}
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
