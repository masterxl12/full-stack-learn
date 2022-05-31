import React from 'react'
import { ITodo } from '../typings'
import TdItem from './Item'

interface TdListProps {
  todoList: ITodo[]
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
}

const TdList: React.FC<TdListProps> = ({ todoList, toggleTodo, removeTodo }) => {
  return (
    <div className="td-list">
      {todoList &&
        todoList.map((item: ITodo) => (
          <TdItem key={item.id} todo={item} toggleTodo={toggleTodo} removeTodo={removeTodo} />
        ))}
    </div>
  )
}

export default TdList
