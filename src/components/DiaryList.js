import React from "react";
import DiaryItem from "./DiaryItem";

export default function DiaryList({ dummyList, onRemove, onEdit }) {
  return (
    <div className="list_wrap">
      <h2>일기리스트</h2>
      <h3>{`${dummyList.length}개의 일기가 있습니다.`}</h3>
      {dummyList.map((item) => (
        <DiaryItem
          key={item.id}
          {...item}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
DiaryList.defaultProps = {
  dummyList: [],
};
