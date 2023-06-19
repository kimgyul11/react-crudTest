import React, { useContext } from "react";
import DiaryItem from "./DiaryItem";
import { DiaryStateContext } from "../context/DiaryDispatch";

export default function DiaryList() {
  const diaryList = useContext(DiaryStateContext);
  console.log(diaryList);
  return (
    <div className="list_wrap">
      <h2>일기리스트</h2>
      <h3>{`${diaryList.length}개의 일기가 있습니다.`}</h3>
      {diaryList.map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
}
DiaryList.defaultProps = {
  dummyList: [],
};
