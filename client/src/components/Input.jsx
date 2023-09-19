import React, { useState } from "react";
import Form from "../style/InputCSS.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getList } from "../store/store.js";

function Input({ time, today }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleInput = (e) => {
    e.target.id === "name"
      ? setName(e.currentTarget.value)
      : setContent(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let body = {
      name: name,
      content: content,
      date: `${time.year}.${time.month}.${time.day} (${
        time.Week[today.getDay()]
      })`,
      time: `${time.amPm} ${time.hour}:${time.minutes}`,
    };

    axios
      .post("/api/submit", body)
      .then((res) => {
        if (res.data.success) {
          setName("");
          setContent("");
          dispatch(getList(res.data.ItemList));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form>
      <input
        type="text"
        placeholder="이름을 적어주세요 :)"
        value={name}
        id="name"
        onChange={(e) => handleInput(e)}
      />
      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        id="content"
        onChange={(e) => handleInput(e)}
      />
      <button
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        확인
      </button>
    </Form>
  );
}

export default Input;
