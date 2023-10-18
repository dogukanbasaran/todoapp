import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addTodoAsync} from '../redux/todos/todosSlice'
import { useState } from 'react'
import Error from './Error'


const Form = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.todos.addNewTodo.isLoading)

  const error = useSelector(state => state.todos.addNewTodo.error)

  const handleSubmit = async (e) => {
    if (!title) return;
    e.preventDefault();
    await dispatch(addTodoAsync({title}));
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{display: "flex", alignItems: "center"}}>
            <input disabled={isLoading} className='new-todo' placeholder='What needs to be done?' autoFocus value={title} onChange={(e) => setTitle(e.target.value)}/>
            {isLoading && <span style={{padding: 10}}>Loading...</span>}
            {error && <Error/>}
    </form>


  )
}

export default Form
