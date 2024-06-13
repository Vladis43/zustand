import { FC, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import css from './styles.module.css'
import { useFilter, useFilteredTodos, useTodos } from '../../store'
import { FilterType, ITodo } from '../../models'
import { TodoItem } from '../TodoItem'

export const TodoList: FC = () => {
  const [filter, setFilter] = useFilter(useShallow(state => [state.filter, state.setFilter]))
  const { loading, error } = useTodos(useShallow(state => ({ loading: state.loading, error: state.error })))
  const { filteredTodos, someCompleted, allCompleted } = useFilteredTodos()

  useEffect(() => {
    if (!filteredTodos.length && filter !== FilterType.ALL) setFilter(FilterType.ALL)
  }, [filter, filteredTodos, setFilter])

  const renderTodos = () => {
    if (error) return <div>Error: {error}</div>

    if (!filteredTodos.length) return <div>No todos available</div>

    return filteredTodos.map((todo: ITodo) => <TodoItem key={todo.id} {...todo}/>)
  }

  return (
    <div className={css.container}>
      <div className={css.filterButtonWrapper}>
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
      <div className={css.content}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          renderTodos()
        )}
      </div>
    </div>
  )
}
