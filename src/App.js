// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __addTodos,
  __deleteTodos,
  __getTodos,
  __switchTodos,
} from "./redux/modules/todosSlice";

function App() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector((state) => state.todos);
  // console.log("todos=>>>", todos);

  // 첫 렌더링시 todos 받아옴
  useEffect(() => {
    dispatch(__getTodos());
  }, []);

  //추가
  const onClickAddButton = (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      contents,
      isDone: false,
    };
    dispatch(__addTodos(newTodo));

    setTitle("");
    setContents("");
  };

  return (
    <div>
      {/* todo 생성 */}
      <form>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input value={contents} onChange={(e) => setContents(e.target.value)} />
        <br />
        <button onClick={onClickAddButton}>추가</button>
      </form>
      {/* todo 리스트 부분 */}
      {todos?.map((todo) => {
        return (
          <div
            style={{ margin: "10px", border: "1px solid black" }}
            key={todo.id}
          >
            {todo.title}
            <br />
            {todo.contents}
            <br />
            {todo.isDone.toString()}
            <div>
              <button onClick={() => dispatch(__deleteTodos(todo.id))}>
                삭제
              </button>
              <button onClick={() => dispatch(__switchTodos(todo))}>
                완료 상태 변경
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
