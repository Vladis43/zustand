import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import { FilterType, ITodo } from '../models'
import { useFilter } from './filter.ts'

interface TodosStore {
  todos: ITodo[],
  loading: boolean,
  error: string | null,
  addTodo: (title: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
  fetchTodos: () => Promise<void>
}

export const useTodos = create<TodosStore>()(
  devtools(persist((set, get): TodosStore => ({
    todos: [],
    loading: false,
    error: null,
    addTodo: (title) => set({ todos: [...get().todos, { id: nanoid(), title, completed: false }] }),
    toggleTodo: (id) => set({
      todos: get().todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    }),
    removeTodo: (id) => set({ todos: get().todos.filter(todo => todo.id !== id) }),
    fetchTodos: async () => {
      set({ loading: true, error: null })

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

        if (!response.ok) throw new Error('Failed to fetch! Try again.')

        set({ todos: await response.json() })
      } catch (error: any) {
        set({ error: error.message })
      } finally {
        set({ loading: false })
      }
    }
  }), { name: 'todos-storage' }))
)


export const useFilteredTodos = () => {
  const filter = useFilter(state => state.filter)
  const todos = useTodos(state => state.todos)

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
