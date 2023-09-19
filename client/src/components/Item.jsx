import React, { useState } from "react";
import ItemList from "../style/ItemCSS";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getList } from "../store/store.js";
import EditInput from "./EditInput";

function Item({ time, today }) {
  const list = useSelector((state) => state.listSlice);
  const reverseList = [...list].reverse();
  const dispatch = useDispatch();
  const [editState, setEditState] = useState("");

  const handleDelete = (e) => {
    e.preventDefault();
    let ItemNum = e.target.id;

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios
        .delete("/api/delete", { data: { ItemNum: ItemNum } })
        .then((res) => {
          res.data.success && dispatch(getList(res.data.ItemList));
        })
        .catch((err) => console.log(err));
    }
  };

  const handelEdit = (e) => {
    e.preventDefault();
    const clickElem = reverseList.filter(
      (a) => a.ItemNum === Number(e.target.id)
    );
    setEditState(clickElem[0].ItemNum);
  };

  return (
    <>
      {reverseList.map((elem) => {
        return editState !== elem.ItemNum ? (
          <ItemList key={elem.ItemNum}>
            <div>
              <h3>{elem.name}</h3>
              <div>
                <sub>{elem.date}</sub>
                <sub>{elem.time}</sub>
              </div>
            </div>
            <p>{elem.content}</p>
            <div className="buttons">
              <button id={elem.ItemNum} onClick={(e) => handelEdit(e)}>
                수정
              </button>
              <button id={elem.ItemNum} onClick={(e) => handleDelete(e)}>
                삭제
              </button>
            </div>
          </ItemList>
        ) : (
          <EditInput
            editState={editState}
            setEditState={setEditState}
            time={time}
            today={today}
          />
        );
      })}
    </>
  );
}

export default Item;
