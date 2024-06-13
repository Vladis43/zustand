import { create } from 'zustand'
import { ITodo } from './models'
import { nanoid } from 'nanoid'

interface TodosStore {
  todos: ITodo[],
  addTodo: (title: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
}

export const useTodos = create<TodosStore>()((set) => ({
  todos: [],
  addTodo: (title) => set(state => ({
    ...state,
    todos: [...state.todos, { id: nanoid(), title, completed: false }]
  })),
  toggleTodo: (id) => set(state => ({
    ...state,
    todos: state.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
  })),
  removeTodo: (id) => set(state => ({ ...state, todos: state.todos.filter(todo => todo.id !== id) })),
}))


interface CounterStore {
  count: number
  increment: () => void
}

export const useCounter = create<CounterStore>()((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 }))
}))
