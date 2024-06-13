import { create } from 'zustand'

interface CounterStore {
  count: number
  increment: () => void
}

export const useCounter = create<CounterStore>()((set): CounterStore => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 }))
}))
