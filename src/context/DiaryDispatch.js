import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const create_date = new Date().getTime();
      const newItem = {
        ...action.data,
        create_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((item) => item.id !== action.id);
    }
    case "EDIT": {
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, content: action.newContent }
          : item
      );
    }
    default:
      return state;
  }
};

export const DiaryContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts").then(
      (res) => res.json()
    );
    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.userId,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        create_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
  };
  useEffect(() => {
    getData();
  }, []);
  //생성
  const onCreate = useCallback((item) => {
    const { author, content, emotion } = item;
    dispatch({
      type: "CREATE",
      data: {
        author,
        content,
        emotion: parseFloat(emotion),
        id: dataId.current,
      },
    });
    dataId.current += 1;
  }, []);
  //삭제
  const onRemove = useCallback((id) => {
    dispatch({ type: "REMOVE", id });
  }, []);
  //수정
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, [onCreate, onRemove, onEdit]);
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        {children}
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default DiaryContextProvider;
