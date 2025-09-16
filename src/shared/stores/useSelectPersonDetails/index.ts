import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

type State = {
  id: number;
  person?: Person;
};

type Actions = {
  setId: (value: number) => void;
  setPerson: (value: Person) => void;
  reset: () => void;
};

const initialState: State = {
  id: -1,
};

const useSelectPersonDetails = create<State & Actions>()(
  immer(set => ({
    id: -1,
    setId: (value: number) =>
      set(state => {
        state.id = value;
      }),
    setPerson: (value: Person) =>
      set(state => {
        state.person = value;
      }),
    reset: () => set(initialState),
  })),
);

export default useSelectPersonDetails;
