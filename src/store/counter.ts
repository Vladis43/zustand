import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface CounterStore {
  count: number
  increment: () => void
}

export const useCounter = create<CounterStore>()(
  devtools((set): CounterStore => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 }))
  }))
)
