import { create } from "zustand";
import { persist } from "zustand/middleware";

type TUser = {
  email?: string;
  token?: string;
};

type TUserStore = {
  user: TUser;
  setUser: (user: TUser) => void;
};

const useUserStore = create<TUserStore>()(
  persist(
    (set, get) => ({
      user: {
        email: undefined,
        token: undefined,
      },
      setUser: (data: TUser) =>
        set({
          user: data,
        }),
    }),
    {
      name: "user-storage",
    }
  )
);

export { useUserStore };
export type { TUser };
