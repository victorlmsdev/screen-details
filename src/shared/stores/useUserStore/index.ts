import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  user: AccountDetails | null;
  accountId: number | null;
};

type Actions = {
  setUser: (value: AccountDetails) => void;
  reset: () => void;
};

const initialState: State = {
  user: null,
  accountId: null,
};

const useUserStore = create<State & Actions>()(
  persist(
    immer(set => ({
      user: null,
      accountId: null,

      setUser: (value: AccountDetails) =>
        set(state => {
          state.user = value;
          state.accountId = value.id;
        }),
      reset: () => set(initialState),
    })),
    {
      name: "user",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserStore;
