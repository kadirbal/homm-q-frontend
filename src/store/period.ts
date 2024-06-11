import { create } from "zustand";

type TPeriod = {
  month: number;
  name: string;
  minOrderAmount: number;
  gifts: string[];
};

type TPeriodStore = {
  periods: TPeriod[];
  addPeriod: (period: TPeriod) => void;
  removePeriod: (month: number) => void;
  updatePeriod: (index: number, key: string, value: Array<string>) => void;
};

const usePeriodStore = create<TPeriodStore>()((set) => ({
  periods: [],
  addPeriod: (period) =>
    set((state) => ({
      periods: [...state.periods, period],
    })),
  removePeriod: (month: number) =>
    set((state) => ({
      periods: [...state.periods.filter((item) => item.month !== month)],
    })),

  updatePeriod: (index, key, value) =>
    set((state) => {
      state.periods[index][key] = value;
      return { periods: [...state.periods] };
    }),
}));

export { usePeriodStore };
export type { TPeriod };
