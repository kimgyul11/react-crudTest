import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    return () => {
      //unmount시점에 실행되는 함수
      console.log("언마운트 될 때 실행.");
    };
  });

  return <div>언마운트 테스트 컴포넌트</div>;
};

export default function Lifecycle() {
  const [counter, setCounter] = useState(0);

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);
  // useEffect(() => {
  //   console.log("업데이트마다 실행.");
  //   return () => {
  //     console.log("언마운트 될때 실행");
  //   };
  // });

  return (
    <div>
      <button onClick={toggle}>클릭</button>
      {isVisible && <UnmountTest />}
      {counter}
      <button onClick={() => setCounter((prev) => ++prev)}>+</button>
    </div>
  );
}
