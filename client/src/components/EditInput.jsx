import React, { useState } from "react";
import EditForm from "../style/EditInputCSS";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getList } from "../store/store";

function EditInput({ editState, setEditState, time, today }) {
  const list = useSelector((state) => state.listSlice);
  const dispatch = useDispatch();
  const EditList = list.filter((a) => a.ItemNum === editState);
  const [name, setName] = useState();
  const [content, setContent] = useState();

  const Edit = (e) => {
    e.target.id === "name"
      ? setName(e.currentTarget.value)
      : setContent(e.currentTarget.value);
  };

  const handleUpdate = (e) => {
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
      .put("/api/update", body)
      .then((res) => {
        console.log(res.data.success);
        res.data.success && setEditState("");
        dispatch(getList(res.data.ItemList));
      })
      .catch((err) => console.log(err));
  };

  return (
    <EditForm>
      <input
        type="text"
        defaultValue={EditList[0].name}
        onChange={(e) => Edit(e)}
        id="name"
      />
      <textarea
        id="content"
        defaultValue={EditList[0].content}
        onChange={(e) => Edit(e)}
      />
      <div className="buttons">
        <button>취소</button>
        <button onClick={(e) => handleUpdate(e)}>수정</button>
      </div>
    </EditForm>
  );
}

export default EditInput;
