import React, { useCallback, useState, useRef, useContext } from "react";
import Input from "./UI/Input";
import { DataDispatchContext } from "../App";

const FormCard = () => {
  const [enteredFiled, setEnteredFiled] = useState({
    title: "",
    content: "",
    score: 1,
  });

  const { handleAddData: onAdd } = useContext(DataDispatchContext);

  const titleRef = useRef();
  const contentRef = useRef();

  const handleChangeFiled = useCallback((e) => {
    const { name, value } = e.target;
    setEnteredFiled((enteredFiled) => ({ ...enteredFiled, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 타이틀 글자수 체크
    if (titleRef.current.value.length < 1) {
      titleRef.current.focus();
      return;
    }

    // 컨텐츠 글자수 체크
    if (contentRef.current.value.length < 1) {
      contentRef.current.focus();
      return;
    }

    alert("저장 성공하였습니다.");
    onAdd(enteredFiled.title, enteredFiled.content, enteredFiled.score);
    setEnteredFiled({ title: "", content: "", score: 1 });
    return;
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>입력카드</h2>
      <Input
        label="타이틀"
        name="title"
        placeholder="제목을 입력하세요."
        onChange={handleChangeFiled}
        value={enteredFiled.title}
        ref={titleRef}
      />
      <Input
        label="컨텐츠"
        name="content"
        isInput={false}
        placeholder="내용을 입력하세요"
        onChange={handleChangeFiled}
        value={enteredFiled.content}
        ref={contentRef}
      />
      <div className="select-field">
        <p>점수</p>
        <select
          name="score"
          id="score"
          value={enteredFiled.score}
          onChange={handleChangeFiled}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <button>저장하기</button>
    </form>
  );
};

export default React.memo(FormCard);
