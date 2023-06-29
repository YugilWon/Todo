import React, { useState } from "react";
import shortid from "shortid";
import { Navigate } from "react-router-dom";
import { Selector } from "react-redux";
import { Dispatch } from "redux";

function Main() {
  const [todos, setTodo] = useState([
    {
      id: shortid.generate(),
      title: "리액트1",
      content: "리액트 공부하기1",
      isDone: false,
    },
    {
      id: shortid.generate(),
      title: "리액트2",
      content: "리액트 공부하기2",
      isDone: true,
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const contentChangeHandler = (event) => {
    setContent(event.target.value);
  };

  const submitBtnHandler = (event) => {
    event.preventDefault();
    const newTodo = {
      id: shortid.generate(),
      title,
      content,
      isDone: false,
    };
    setTodo([...todos, newTodo]);
    setTitle("");
    setContent("");
  };

  const DoneBtnHandler = (id) => {
    setTodo((beforeTodo) => {
      return beforeTodo.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: true };
        }
        return item;
      });
    });
  };

  const CancelBtnHandler = (id) => {
    setTodo((beforeTodo) => {
      return beforeTodo.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: false };
        }
        return item;
      });
    });
  };

  const DeletBtnHandler = (id) => {
    const updateTodos = todos.filter((todos) => todos.id !== id);
    setTodo(updateTodos);
  };

  const workingtodo = todos.filter((todos) => !todos.isDone);
  const donetodo = todos.filter((todos) => todos.isDone);

  return (
    <>
      <div className="TopBar">화이팅</div>

      <form className="Input">
        <label className="Title-label">제목</label>
        <input
          type="text"
          className="title-input"
          value={title}
          onChange={titleChangeHandler}
        ></input>

        <label className="Title-label">내용</label>
        <input
          type="text"
          className="content-input"
          value={content}
          onChange={contentChangeHandler}
        ></input>
        <button className="submitBtn" onClick={submitBtnHandler}>
          추가하기
        </button>

        <div className="Todo-Container">
          <div className="Working-Container">
            <h2>Working...</h2>
            {workingtodo.map((item) => (
              <div className="Working">
                <h2>{item.title}</h2>
                {item.content}
                <div className="Btn-Container">
                  <button
                    className="DeletBtn"
                    onClick={() => DeletBtnHandler(item.id)}
                  >
                    삭제하기
                  </button>

                  <button
                    className="DoneBtn"
                    onClick={() => DoneBtnHandler(item.id)}
                  >
                    완료하기
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="Done-Container">
            <h2>Done...</h2>
            {donetodo.map((item) => (
              <div className="Done">
                <h2>{item.title}</h2>
                {item.content}
                <div className="Btn-Container">
                  <button
                    className="DeletBtn"
                    onClick={() => DeletBtnHandler(item.id)}
                  >
                    삭제하기
                  </button>

                  <button
                    className="DoneBtn"
                    onClick={() => CancelBtnHandler(item.id)}
                  >
                    취소하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </>
  );
}

export default Main;
