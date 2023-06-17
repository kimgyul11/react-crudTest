import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./components/DiaryEditor";
import DiaryList from "./components/DiaryList";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (item) => {
    const { author, content, emotion } = item;
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current,
    };
    setData([newItem, ...data]);
    dataId.current += 1;
  };
  const onRemove = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : item
      )
    );
  };
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList dummyList={data} onDelete={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
