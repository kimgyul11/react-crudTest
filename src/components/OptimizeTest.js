import React, { useState } from "react";

const CounterA = React.memo(({ count }) => {
  console.log("카운트 A업뎃");
  return <div>{count}</div>;
});

const CounterB = ({ obj }) => {
  console.log("카운트 B업뎃");
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;
};
const MemoziedCounterB = React.memo(CounterB, areEqual);

export default function OptimizeTest() {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div>
      <div>
        <h2>카운터 A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>카운터 B</h2>
        <MemoziedCounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>B button</button>
      </div>
    </div>
  );
}
