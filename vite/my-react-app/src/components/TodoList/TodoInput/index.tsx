import React, { ReactElement, useRef } from 'react'
import { ITodo } from '../typings'

interface ITdInputProps {
  addTodo: (value: ITodo) => void
  todoList: ITodo[]
}

const TdInput: React.FC<ITdInputProps> = ({ addTodo, todoList }): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null)
  const addItem = () => {
    let val = inputRef.current!.value?.trim()
    if (val.length) {
      let isExist = todoList.find((item: ITodo) => item.content === val)
      if (isExist) {
        alert('待办项已存在')
        return
      }
      addTodo({
        id: new Date().getTime(),
        content: val,
        completed: false,
      })
      inputRef.current!.value = ''
    }
  }

  return (
    <div className="td-input">
      <input type="text" placeholder="请输入待办项" ref={inputRef} />
      <button onClick={addItem}>添加</button>
    </div>
  )
}

export default TdInput
