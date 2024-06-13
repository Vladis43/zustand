import { FC } from 'react'
import './App.css'
import { NewTodo, TodoList, TotalTodos } from './components'

export const App: FC = () => {
  return (
    <>
      <header>
        <h1>Hello Zustand! 🧸</h1>
      </header>
      <main>
        <NewTodo/>
        <TodoList/>
        <TotalTodos/>
      </main>
    </>
  )
}
