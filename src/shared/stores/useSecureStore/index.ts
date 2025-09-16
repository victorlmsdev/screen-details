import * as SecureStore from "expo-secure-store";
import { keys } from "./keys";
const useSecureStore = () => {
  const save = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  };
  const getValue = async (key: string) => {
    const res = await SecureStore.getItemAsync(key);
    return res;
  };

  const deleteValue = async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  };
  return { save, getValue, deleteValue, keys };
};

export default useSecureStore;
