import React from "react";
import Input from "./Input";
import Item from "./Item";

function Main() {
  const today = new Date();
  const time = {
    year: today.getFullYear(),
    month: (today.getMonth() + 1).toString().padStart(2, "0"),
    day: today.getDate().toString().padStart(2, "0"),
    Week: ["일", "월", "화", "수", "목", "금", "토"],
    hour: today.getHours().toString().padStart(2, "0"),
    minutes: today.getMinutes().toString().padStart(2, "0"),
    amPm: today.getHours() >= 12 ? "오후" : "오전",
  };

  return (
    <div>
      <Input time={time} today={today} />
      <Item time={time} today={today} />
    </div>
  );
}

export default Main;
