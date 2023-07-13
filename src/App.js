import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos } from "./redux/modules/todosSlice12";

function App() {
  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector((state) => state.todos);
  // console.log("todos=>>>", todos);

  useEffect(() => {
    dispatch(__getTodos());
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <div
          style={{ margin: "10px", border: "1px solid black" }}
          key={todo.id}
        >
          {todo.title}
          <br />
          {todo.contents}
          <br />
          {todo.isDone.toString()}
        </div>
      ))}
    </div>
  );
}

export default App;
