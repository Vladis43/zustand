import { FC } from 'react'
import './App.css'
import { Counter, NewTodo, TodoList, TotalTodos } from './components'

export const App: FC = () => {
  return (
    <>
      <Counter/>
      <hr/>
      <h1>Hello Zustand!</h1>
      <NewTodo/>
      <TodoList/>
      <TotalTodos/>
    </>
  )
}
