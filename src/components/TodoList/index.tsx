import { FC } from 'react'
import styles from './styles.module.css'
import { useTodos } from '../../store.ts'
import { ITodo } from '../../models'
import { TodoItem } from '../TodoItem'

export const TodoList: FC = () => {
  const todos = useTodos(state => state.todos)

  if (!todos.length) return null

  return (
    <div className={styles.container}>
      {todos.map((todo: ITodo) => <TodoItem key={todo.id} {...todo}/>)}
    </div>
  )
}
