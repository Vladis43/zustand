import { FC, FormEvent, useState } from 'react'
import styles from './styles.module.css'
import { useTodos } from '../../store'

export const NewTodo: FC = () => {
  const [text, setText] = useState<string>('')
  const addTodo = useTodos(state => state.addTodo)

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    text && addTodo(text)
    setText('')
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input type="text" placeholder="Todo..." value={text} onChange={(e) => setText(e.target.value)}/>
      <button type="submit" className={styles.button}>Add To-do</button>
    </form>
  )
}
