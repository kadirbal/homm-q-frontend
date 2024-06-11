import { create } from "zustand";

type TBasketItem = {
  quantity: number;
  id: string;
};

type TBasketStore = {
  items: TBasketItem[];
  addItem: (item: TBasketItem) => void;
  incQuantity: (id: string) => void;
  decQuantity: (id: string) => void;
};

const useBasketStore = create<TBasketStore>()((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  incQuantity: (id) =>
    set((state) => {
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].quantity += 1;
      return { items: [...state.items] };
    }),
  decQuantity: (id) =>
    set((state) => {
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].quantity -= 1;
      return { items: [...state.items] };
    }),
}));

export { useBasketStore };
