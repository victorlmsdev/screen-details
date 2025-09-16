import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components/native";
import Settings from "./SettingsScreen";
import { RouteHeader } from "~/shared/components";

const Stack = createNativeStackNavigator<StackParamsList>();
const SettingsStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerTitle: () => <RouteHeader name="Screen Details" />,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
