import { FilterType, ITodo } from '../models'
import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { useFilter } from './filter.ts'

interface TodosStore {
  todos: ITodo[],
  addTodo: (title: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
}

export const useTodos = create<TodosStore>()((set, get): TodosStore => ({
  todos: [],
  addTodo: (title) => set({ todos: [...get().todos, { id: nanoid(), title, completed: false }] }),
  toggleTodo: (id) => set({
    todos: get().todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
  }),
  removeTodo: (id) => set({ todos: get().todos.filter(todo => todo.id !== id) }),
}))

export const useFilteredTodos = () => {
  const [filter, setFilter] = useFilter(state => [state.filter, state.setFilter])
  const todos = useTodos(state => state.todos)

  if (!todos.length && filter !== FilterType.ALL) {
    setFilter(FilterType.ALL)
  }

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case FilterType.COMPLETED:
        return todo.completed
      case FilterType.UNCOMPLETED:
        return !todo.completed
      default:
        return true
    }
  })

  const someCompleted: boolean = todos.some(todo => todo.completed)
  const allCompleted: boolean = todos.every(todo => todo.completed)

  return { filteredTodos, someCompleted, allCompleted }
}
