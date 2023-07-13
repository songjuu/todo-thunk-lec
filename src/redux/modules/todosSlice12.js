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
      const data = await axios.get("http://localhost:4001/todos");

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
      const data = await axios.post("http://localhost:4001/todos", newTodo);
      return thunkAPI.fulfillWithValue(data.data);
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
      //payload 할 일의 id
      const data = await axios.patch(`http://localhost:4001/todos/${payload}`);
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
    [__getTodos.pending]: (state, aciton) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, aciton) => {
      state.isLoading = false;
      state.todos = aciton.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = true;
      state.isError = true;
      state.error = action.payload;
    },
    [__addTodos.pending]: (state, aciton) => {
      state.isLoading = true;
    },
    [__addTodos.fulfilled]: (state, aciton) => {
      state.isLoading = false;
      state.todos = [...state, aciton.payload];
    },
    [__addTodos.rejected]: (state, action) => {
      state.isLoading = true;
      state.isError = true;
      state.error = action.payload;
    },
    [__switchTodos.pending]: (state, aciton) => {
      state.isLoading = true;
    },
    [__switchTodos.fulfilled]: (state, aciton) => {
      state.isLoading = false;
      //todos 수정할 거 넣어서 묶어주기
      // state.todos =
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
