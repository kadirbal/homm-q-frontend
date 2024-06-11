import { create } from "zustand";

type TForm = {
  email: string;
  password: string;
};

type TFormStore = {
  form: TForm;
  setForm: (name: string, value: string) => void;
};

const useFormStore = create<TFormStore>()((set) => ({
  form: {
    email: "",
    password: "",
  },
  setForm: (name, value) =>
    set((state) => ({
      form: { ...state.form, [name]: value },
    })),
}));

type Tab = "login" | "register";

type TabStore = {
  active: Tab;
  setActive: (tab: Tab) => void;
};

const useTabStore = create<TabStore>()((set) => ({
  active: "register",
  setActive: (tab) => set(() => ({ active: tab })),
}));
export { useFormStore, useTabStore };
