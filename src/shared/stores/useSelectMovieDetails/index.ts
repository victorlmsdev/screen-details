import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

type State = {
  id: number;
  movie?: Movie;
};

type Actions = {
  setId: (value: number) => void;
  setMovie: (value: Movie) => void;
  reset: () => void;
};

const initialState: State = {
  id: -1,
};

const useSelectMovieDetails = create<State & Actions>()(
  immer(set => ({
    id: -1,
    setId: (value: number) =>
      set(state => {
        state.id = value;
      }),
    setMovie: (value: Movie) =>
      set(state => {
        state.movie = value;
      }),
    reset: () => set(initialState),
  })),
);

export default useSelectMovieDetails;
