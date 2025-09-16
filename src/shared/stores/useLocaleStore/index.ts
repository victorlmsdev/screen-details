import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type LocaleProps = {
  languageCode: string | null;
  languageTag: string;
  regionCode: string | null;
};

type State = {
  userLocale: LocaleProps;
  defaultLocale: LocaleProps;
};

type Actions = {
  setLocale: (value: LocaleProps) => void;
  reset: () => void;
};

const initialState: State = {
  userLocale: { languageCode: "en", languageTag: "en-US", regionCode: "US" },
  defaultLocale: { languageCode: "en", languageTag: "en-US", regionCode: "US" },
};

const useLocaleStore = create<State & Actions>()(
  immer(set => ({
    userLocale: { languageCode: "en", languageTag: "en-US", regionCode: "US" },
    defaultLocale: {
      languageCode: "en",
      languageTag: "en-US",
      regionCode: "US",
    },
    setLocale: (value: LocaleProps) =>
      set(state => {
        state.userLocale = value;
      }),
    reset: () => set(initialState),
  })),
);

export default useLocaleStore;
