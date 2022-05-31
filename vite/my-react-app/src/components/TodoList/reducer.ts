import { ACTION_TYPE, IAction, ITodo, ITodoState } from './typings/index'

const todoReducer = (state: ITodoState, action: IAction): ITodoState => {
  const { type, payload } = action
  switch (type) {
    case ACTION_TYPE.INIT_TODO_LIST:
      return {
        ...state,
        todoList: payload as ITodo[],
      }
    case ACTION_TYPE.ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, payload as ITodo],
      }
    case ACTION_TYPE.REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((item: ITodo) => item.id !== payload),
      }
    case ACTION_TYPE.TOGGLE_TODO:
      return {
        ...state,
        todoList: state.todoList.map((item: ITodo) => {
          return item.id === payload
            ? {
                ...item,
                completed: !item.completed,
              }
            : item
        }),
      }
    default:
      return state
  }
}

export { todoReducer }
