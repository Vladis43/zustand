import { FC } from 'react'
import styles from './styles.module.css'
import { useFilter, useFilteredTodos } from '../../store'
import { FilterType, ITodo } from '../../models'
import { TodoItem } from '../TodoItem'

export const TodoList: FC = () => {
  const [filter, setFilter] = useFilter(state => [state.filter, state.setFilter])
  const { filteredTodos, someCompleted, allCompleted } = useFilteredTodos()

  if (!filteredTodos.length) return null

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <button disabled={filter === FilterType.ALL} onClick={() => setFilter(FilterType.ALL)}>
          All
        </button>
        <button
          disabled={filter === FilterType.COMPLETED || !someCompleted}
          onClick={() => setFilter(FilterType.COMPLETED)}
        >
          Completed
        </button>
        <button
          disabled={filter === FilterType.UNCOMPLETED || allCompleted}
          onClick={() => setFilter(FilterType.UNCOMPLETED)}
        >
          Uncompleted
        </button>
      </div>
      {filteredTodos.map((todo: ITodo) => <TodoItem key={todo.id} {...todo}/>)}
    </div>
  )
}
