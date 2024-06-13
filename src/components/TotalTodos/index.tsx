import { FC } from 'react'
import { useTodos } from '../../store.ts'

export const TotalTodos: FC = () => {
  const count = useTodos(state => state.todos.length)

  return (
    <h3>Total todos: {count}</h3>
  )
}
