import React, { ReactElement } from 'react'
import { ITodo } from '../typings'

interface TdItemProps {
  todo: ITodo
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
}

const Item: React.FC<TdItemProps> = ({ todo, toggleTodo, removeTodo }): ReactElement => {
  const { id, content, completed } = todo
  return (
    <div>
      <input type="checkbox" checked={completed} onChange={() => toggleTodo(id)} />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{content}</span>
      <button onClick={() => removeTodo(id)}>删除</button>
    </div>
  )
}
export default Item
