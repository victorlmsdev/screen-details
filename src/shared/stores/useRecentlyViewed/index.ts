import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type State = {
  moviesHistory: MovieCard[];
};

type Actions = {
  setMovies: (value: MovieCard[]) => void;
  addMovie: (value: MovieCard) => void;
  reset: () => void;
};

const initialState: State = {
  moviesHistory: [],
};

const useRecentlyViewedStore = create<State & Actions>()(
  persist(
    immer(set => ({
      moviesHistory: [],

      setMovies: (value: MovieCard[]) =>
        set(state => {
          state.moviesHistory = value;
        }),
      addMovie: (value: MovieCard) => {
        set(state => {
          if (state.moviesHistory.length === 0) {
            state.moviesHistory.push(value);
          } else {
            const newMoviesHistory = state.moviesHistory.filter(
              movie => movie.id !== value.id,
            );

            newMoviesHistory.unshift(value);

            if (newMoviesHistory.length > 7) {
              newMoviesHistory.pop();
            }

            state.moviesHistory = newMoviesHistory;
          }
        });
      },
      reset: () => set(initialState),
    })),
    {
      name: "recently-viewed",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useRecentlyViewedStore;
