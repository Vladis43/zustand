import { FC } from 'react'
import { useShallow } from 'zustand/react/shallow'
import css from './styles.module.css'
import { ITodo } from '../../models'
import { useTodos } from '../../store'

export const TodoItem: FC<ITodo> = ({ id, title, completed }) => {
  const { toggleTodo, removeTodo } = useTodos(useShallow(state => ({
    toggleTodo: state.toggleTodo,
    removeTodo: state.removeTodo
  })))

  return (
    <div className={css.container}>
      <div className={css.checkboxWrapper}>
        <input id={id} type="checkbox" checked={completed} onChange={() => toggleTodo(id)}/>
        <label className={css.label} htmlFor={id}>{title}</label>
      </div>
      <button className={css.deleteButton} onClick={() => removeTodo(id)}>Delete</button>
    </div>
  )
}
