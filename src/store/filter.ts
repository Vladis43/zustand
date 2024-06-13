import { create } from 'zustand'
import { FilterType } from '../models'

interface FilterStore {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const useFilter = create<FilterStore>()((set): FilterStore => ({
  filter: FilterType.ALL,
  setFilter: (filter) => set({ filter }),
}))
