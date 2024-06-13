import { FC } from 'react'
import styles from './styles.module.css'
import { ITodo } from '../../models'
import { useTodos } from '../../store'

export const TodoItem: FC<ITodo> = ({ id, title, completed }) => {
  const toggleTodo = useTodos(state => state.toggleTodo)
  const removeTodo = useTodos(state => state.removeTodo)

  return (
    <div className={styles.container}>
      <div className={styles.checkboxWrapper}>
        <input id={id} type="checkbox" checked={completed} onChange={() => toggleTodo(id)}/>
        <label htmlFor={id} className={styles.label}>{title}</label>
      </div>
      <button type="button" onClick={() => removeTodo(id)}>Delete</button>
    </div>
  )
}
