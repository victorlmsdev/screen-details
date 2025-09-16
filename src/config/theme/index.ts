import DarkTheme from "./darkTheme";
import LightTheme from "./lightTheme";
import { useColorScheme } from "react-native";

const useThemeConfig = function () {
  const scheme = useColorScheme();

  if (scheme === "dark") return DarkTheme;

  return LightTheme;
};

export default useThemeConfig;
