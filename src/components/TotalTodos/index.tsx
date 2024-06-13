import { FC } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useTodos } from '../../store'

export const TotalTodos: FC = () => {
  const count = useTodos(useShallow(state => state.todos.length))

  return (
    <div>
      <hr/>
      <h3>Total todos: {count}</h3>
    </div>
  )
}
