import { create } from "zustand";

type TProduct = {
    price: number;
    name: string;
    code: string;
    id: string;
};

type Store = {
    products: TProduct[];
    setProducts: (items: TProduct[]) => void;
};

const useProductStore = create<Store>()((set) => ({
    products: [],
    setProducts: (items: TProduct[]) => set({ products: items }),
}));

export { useProductStore };
export type { TProduct };
