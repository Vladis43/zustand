import { FC } from 'react'
import { useCounter } from '../../store'

export const Counter: FC = () => {
  const [count, increment] = useCounter(state => [state.count, state.increment])

  return <button type="button" onClick={increment}>Count {count}</button>
}
