import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { FilterType } from '../models'

interface FilterStore {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const useFilter = create<FilterStore>()(
  devtools((set): FilterStore => ({
    filter: FilterType.ALL,
    setFilter: (filter) => set({ filter }),
  }))
)
