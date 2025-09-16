import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  genres: Genre[];
};

type Actions = {
  setGenres: (value: Genre[]) => void;
  reset: () => void;
};

const initialState: State = {
  genres: [],
};

const useGenreStore = create<State & Actions>()(
  immer(set => ({
    genres: [],
    setGenres: (value: Genre[]) =>
      set(state => {
        state.genres = value;
      }),
    reset: () => set(initialState),
  })),
);

export default useGenreStore;
