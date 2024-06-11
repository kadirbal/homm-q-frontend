import { create } from "zustand";

type TGift = {
  id: string;
  name: string;
};

type TOrder = {
  id: string;
  amount: number;
  gifts: [];
};

type TOrderStore = {
  id: string;
  amount: number;
  gifts: [];
  setOrder: (data: TOrder) => void;
};

const useOrderStore = create<TOrderStore>()((set) => ({
  id: "",
  amount: -1,
  gifts: [],
  setOrder: (data) =>
    set({
      id: data.id,
      amount: data.amount,
      gifts: data.gifts,
    }),
}));

export { useOrderStore };
