import React, { useState, useRef, useContext } from "react";
import { DataDispatchContext } from "../App";

const DataItem = ({ title, created_at, content, score, id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const localContentRef = useRef();
  const { handleEditData: onEdit, handleRemoveData: onRemove } =
    useContext(DataDispatchContext);
  const toggleEditStatus = () => {
    setIsEdit(!isEdit);
  };
  const quitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };
  const handleEdit = () => {
    if (localContent.length < 1) {
      localContentRef.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 데이터를 수정하시겠어요?`)) {
      onEdit(id, localContent);
      toggleEditStatus();
    }
  };
  const handleRemove = () => {
    if (window.confirm(`${id}번째 데이터를 삭제하시겠어요?`)) {
      onRemove(id);
    }
    return;
  };

  return (
    <li className="data-item">
      <div className="header">
        <h3>{title}</h3>
        <p>{new Date(created_at).toLocaleString()}</p>
      </div>
      {isEdit ? (
        <textarea
          ref={localContentRef}
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{content}</p>
      )}

      <div className="footer">
        <p className="score">{score}점</p>
        <div className="btn-actions">
          {isEdit ? (
            <>
              <button onClick={quitEdit}>수정취소하기</button>
              <button onClick={handleEdit}>수정완료하기</button>
            </>
          ) : (
            <>
              <button onClick={toggleEditStatus}>수정하기</button>
              <button onClick={handleRemove}>삭제하기</button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default React.memo(DataItem);
