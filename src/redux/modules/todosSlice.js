import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
};

//todo 가져오기
export const __getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      //시도! data fetch
      const data = await axios.get("http://localhost:4000/todos");

      //성공한 경우
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      //실패한 경우
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// add(추가)
export const __addTodos = createAsyncThunk(
  "todos/addTodos",

  //dispatch에서 받아온 객체 추가해서 넣어줘야함
  async (newTodo, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:4000/todos", newTodo);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//delete(삭제)
export const __deleteTodos = createAsyncThunk(
  "todos/deleteTodos",

  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(`http://localhost:4000/todos/${payload}`);
      console.log("data~~~!!!", data); //삭제 되니까 빈 객체가 맞고
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// switch(수정)
export const __switchTodos = createAsyncThunk(
  "todos/switchTodos",
  async (payload, thunkAPI) => {
    try {
      //payload
      const todo = payload;
      console.log(todo);
      const data = await axios.patch(`http://localhost:4000/todos/${todo.id}`, {
        isDone: !todo.isDone,
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    //pending(데이터를 가지고 오는중)
    //fullfield(데이터를 가져오는 것 완료)
    //rejected(데이터 가져오는 것 실패)
    [__getTodos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = true;
      state.isError = true;
      state.error = action.payload;
    },
    [__addTodos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__addTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.todos = state.todos.push(action.paylod); //숫자로 나오게됨 왜냐 push는 배열의 새로운 길이 반환
      // console.log("action.payload", action.payload);
      // state.todos.push(action.paylod);
      state.todos = [...state.todos, action.payload];
    },
    [__addTodos.rejected]: (state, action) => {
      state.isLoading = true;
      state.isError = true;
      state.error = action.payload;
    },
    [__deleteTodos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log("action payload ID=>>", action.payload);
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    [__deleteTodos.rejected]: (state, action) => {
      state.isLoading = true;
      state.isError = true;
      state.error = action.payload;
    },
    [__switchTodos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__switchTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      //todos 수정할 거 넣어서 묶어주기
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isDone: action.payload.isDone };
        } else {
          return todo;
        }
      });
      state.isError = false;
    },
    [__switchTodos.rejected]: (state, action) => {
      state.isLoading = true;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

// export const {} = todosSlice.actions; //reducer에 있는걸 내보낸, 예측가능한 비동기로직 아닌거
export default todosSlice.reducer;
