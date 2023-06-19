import React, { useContext } from "react";
import { DiaryStateContext } from "../context/DiaryDispatch";

export default function Info() {
  const data = useContext(DiaryStateContext);
  const getDiaryAnalysis = () => {
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const totalValue = data.reduce((total, item) => total + item.emotion, 0);
    return { goodCount, badCount, totalValue };
  };
  const { goodCount, badCount, totalValue } = getDiaryAnalysis();

  return (
    <div>
      <div>전체 게시글 : {data.length}</div>
      <div>3점 이상 게시글 : {goodCount}</div>
      <div>2점 이하 게시글 : {badCount}</div>
      <div>평점 : {(totalValue / data.length).toFixed(2)} 점</div>
    </div>
  );
}
