import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import HomeStack from "~/features/HomeTab/routes";
import SearchStack from "~/features/SearchTab/routes";
import useGetUserDetails from "~/features/SettingsTab/hooks/useGetUserDetails";
import SettingsStack from "~/features/SettingsTab/routes";
import { Loader } from "~/shared/components";
import { FirebaseService } from "~/shared/services/firebase";
import useSetUserLocale from "../queries/useSetUserLocale";
import { TabBar } from "./components";
import Error from "./Error";
import { onlineManager } from "@tanstack/react-query";

const Tab = createBottomTabNavigator<TabParamsList>();

const Routes = function () {
  FirebaseService.initialize();
  useSetUserLocale();

  const {
    user,
    mutate: getUserDetails,
    isPending,
    isError,
  } = useGetUserDetails();

  useEffect(() => {
    getUserDetails();
  }, []);

  if (!user && (isError || !onlineManager.isOnline()))
    return (
      <Error
        error="Sem internet"
        callback={getUserDetails}
        callbackText="Tentar novamente"
      />
    );

  if (!user && isPending) return <Loader fullPage />;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="HomeTab" component={HomeStack} />
        <Tab.Screen name="SearchTab" component={SearchStack} />
        <Tab.Screen name="SettingsTab" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
