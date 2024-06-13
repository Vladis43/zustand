import { FC, FormEvent, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import css from './styles.module.css'
import { useCounter, useTodos } from '../../store'

export const NewTodo: FC = () => {
  const [text, setText] = useState<string>('')
  const { addTodo, fetchTodos } = useTodos(useShallow(state => ({
    addTodo: state.addTodo,
    fetchTodos: state.fetchTodos
  })))
  const { count, increment } = useCounter(useShallow(state => ({ count: state.count, increment: state.increment })))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    text && addTodo(text)
    setText('')
  }

  return (
    <div>
      <div className={css.fetchButtonWrapper}>
        <button className={css.fetchButton} onClick={fetchTodos}>Fetch async todos</button>
        <button className={css.countButton} onClick={increment}>Count {count}</button>
      </div>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          placeholder="Todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className={css.addButton} type="submit">Add Todo</button>
      </form>
    </div>
  )
}
