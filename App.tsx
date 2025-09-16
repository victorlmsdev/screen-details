/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";

import NetInfo from "@react-native-community/netinfo";
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { ThemeProvider } from "styled-components/native";
import Routes from "./src/config/routes";
import useThemeConfig from "./src/config/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

function App(): React.JSX.Element {
  useEffect(() => {
    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        setOnline(!!state.isInternetReachable);
      });
    });
    queryClient.setDefaultOptions({
      queries: {
        throwOnError(error, query) {
          if (process.env.node_env != "production") console.log(query, error);
          return false;
        },
      },
    });
    SplashScreen.hide();
  }, []);

  const Theme = useThemeConfig();

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: Theme.colors.background,
    flex: 1,
  };

  return (
    <ThemeProvider theme={Theme}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView
            edges={["right", "bottom", "left"]}
            style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? "light-content" : "dark-content"}
              backgroundColor={Theme.colors.background}
            />
            <Routes />
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
