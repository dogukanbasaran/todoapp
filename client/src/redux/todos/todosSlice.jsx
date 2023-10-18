import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync/", async () => {
    // const res = await fetch("http://localhost:7000/todos");
    // return await res.json();

    const res = await axios("http://localhost:7000/todos");
    return res.data;

})

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (data) => {
    const res = await axios.post("http://localhost:7000/todos", data);
    return res.data;
})

export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync", async ({id, data}) => {
    const res = await axios.patch(`http://localhost:7000/todos/${id}`, data);
    return res.data;
})

export const removeTodoAsync = createAsyncThunk("todos/removeTodoAsync", async(id) => {
    const res = await axios.delete(`http://localhost:7000/todos/${id}`);
    return id;
})


export const todosSlice = createSlice({
    name: 'todos',
    initialState:{
        items: [
           
        ],
        isLoading: false,
        error: null,
        activeFilter: 'all',
        addNewTodo: {
            isLoading: false,
            error: false
        }
    },

    reducers:{

        // toggle: (state, action) => {
        //     const {id} = action.payload;

        //     const item = state.items.find(item => item.id === id);

        //     item.completed = !item.completed;
        // },
        // destroy: (state, action) => {
        //     const id = action.payload;
        //     const filtered = state.items.filter((item) => item.id !== id);
        //     state.items = filtered;
        // },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter(item => item.completed === false);
            state.items = filtered;
        }
    },
    extraReducers: {

        // GET TODO

        [getTodosAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },

        // ADD TODO
        [addTodoAsync.pending]: (state, action) => {
            state.addNewTodo.isLoading = true;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.addNewTodo.isLoading = false;
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodo.isLoading = false;
            state.addNewTodo.error = action.error.message;
        },

        // Toggle Todo

        [toggleTodoAsync.fulfilled]: (state, action) => {
            const {id, completed} = action.payload;
            const index = state.items.findIndex(item => item.id === id);
            state.items[index].completed = completed;
        },

        // Remove Todo

        [removeTodoAsync.fulfilled]: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id !== id);
            state.items = filtered;

            // 2. yöntem

            /* 
                 const id = action.payload;
                 const index = state.items.findIndex((item) => item.id === id);
                 state.items.splice(index, 1);
            */
        }
    }

});

export const { changeActiveFilter, clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;

export const selectTodos = state => state.todos.items;
export const selectFilteredTodos = (state) => {
    if(state.todos.activeFilter === "all"){
        return state.todos.items;
    }
    return state.todos.items.filter((todo) => 
        state.todos.activeFilter === "active" ? todo.completed === false : todo.completed === true
    )
}