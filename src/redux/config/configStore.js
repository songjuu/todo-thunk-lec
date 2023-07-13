import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todosSlice12";

//컴포넌트의 상태 관리
const store = configureStore({
  reducer: {
    todos,
  },
});

export default store;
