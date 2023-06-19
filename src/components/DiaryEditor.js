import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "./DiaryEditor.module.css";
import { DiaryDispatchContext } from "../context/DiaryDispatch";

function DiaryEditor() {
  const { onCreate } = useContext(DiaryDispatchContext);
  const authorInput = useRef();
  const contentInput = useRef();

  const [error, setError] = useState({
    code: 0,
    message: "",
  });
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });
  const handlerSubmit = (e) => {
    e.preventDefault();
    if (state.author.trim().length < 1) {
      authorInput.current.focus();
      setError({
        code: 1,
        message: "작성자를 입력해주세요",
      });
      return;
    }
    if (state.content.trim().length < 1) {
      contentInput.current.focus();
      setError({
        code: 2,
        message: "본문 내용을 입력하세요",
      });
      return;
    }
    if (state.content.trim().length < 5) {
      contentInput.current.focus();
      setError({
        code: 3,
        message: "본문의 길이가 짧습니다.",
      });
      return;
    }

    alert("저장 완료");
    onCreate(state);
    setError({ code: 0, message: "" });
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
    authorInput.current.focus();
  };

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={styled.editorwrap}>
      <h2>게시글</h2>
      <form onSubmit={handlerSubmit}>
        <div>
          <input
            ref={authorInput}
            name="author"
            value={state.author}
            onChange={handleChangeState}
            placeholder="제목을 입력하세요"
          />
          {error.code === 1 && <p>{error.message}</p>}
        </div>
        <div>
          <textarea
            name="content"
            ref={contentInput}
            value={state.content}
            onChange={handleChangeState}
            placeholder="내용을 입력해주세요"
          />
          {error.code === 2 && <p>{error.message}</p>}
          {error.code === 3 && <p>{error.message}</p>}
        </div>
        <div>
          <span>리뷰</span>
          <select
            name="emotion"
            value={state.emotion}
            onChange={handleChangeState}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <button>SAVE</button>
        </div>
      </form>
    </div>
  );
}
export default React.memo(DiaryEditor);
