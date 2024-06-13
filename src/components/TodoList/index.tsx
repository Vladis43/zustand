import { FC, useEffect } from 'react'
import styles from './styles.module.css'
import { useFilter, useFilteredTodos } from '../../store'
import { FilterType, ITodo } from '../../models'
import { TodoItem } from '../TodoItem'

export const TodoList: FC = () => {
  const [filter, setFilter] = useFilter(state => [state.filter, state.setFilter])
  const { filteredTodos, someCompleted, allCompleted } = useFilteredTodos()

  useEffect(() => {
    if (!filteredTodos.length && filter !== FilterType.ALL) setFilter(FilterType.ALL)
  }, [filteredTodos])

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <button
          disabled={filter === FilterType.ALL || !filteredTodos.length}
          onClick={() => setFilter(FilterType.ALL)}
        >
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
      {!filteredTodos.length ? (
        <div>No todos available</div>
      ) : (
        filteredTodos.map((todo: ITodo) => <TodoItem key={todo.id} {...todo}/>)
      )}
    </div>
  )
}
