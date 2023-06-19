import React, { useContext, useRef, useState } from "react";
import styles from "./DiaryItem.module.css";
import { DiaryDispatchContext } from "../context/DiaryDispatch";

function DiaryItem({ id, author, content, emotion, create_date }) {
  console.log(`${id}번째 아이템 렌더`);
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const onClickHandler = () => {
    if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleNewEdit = () => {
    if (localContent.trim().length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className={styles.diaryItem}>
      <div className={styles.diaryItem_header}>
        <span className={styles.info}>
          작성자 : {author} | 리뷰 : {emotion}
        </span>
        <br />
        <span className={styles.date}>
          {new Date(create_date).toLocaleString()}
        </span>
      </div>
      <div className={styles.diaryItem_content}>
        {isEdit ? (
          <>
            <textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              ref={localContentInput}
            />
          </>
        ) : (
          content
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleNewEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={onClickHandler}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
}

export default React.memo(DiaryItem);
