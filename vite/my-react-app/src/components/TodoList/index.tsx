import React, { useCallback, useEffect, useReducer } from 'react'
import TdList from './List'
import { todoReducer } from './reducer'
import TdInput from './TodoInput'
import { ACTION_TYPE, ITodo, ITodoState } from './typings'

const initialState: ITodoState = {
  todoList: [],
}

const TodoList = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = useCallback((todo: ITodo) => {
    dispatch({ type: ACTION_TYPE.ADD_TODO, payload: todo })
  }, [])

  const toggleTodo = useCallback((id: number) => {
    dispatch({ type: ACTION_TYPE.TOGGLE_TODO, payload: id })
  }, [])

  const removeTodo = useCallback((id: number) => {
    dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: id })
  }, [])

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todoList') || '[]')
    dispatch({ type: ACTION_TYPE.INIT_TODO_LIST, payload: todoList })
  }, [])

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(state.todoList))
  }, [state.todoList])

  return (
    <div className="todo-list">
      <TdInput addTodo={addTodo} todoList={state.todoList} />
      <TdList todoList={state.todoList} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    </div>
  )
}

export default TodoList
