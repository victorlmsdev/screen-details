import React, { useCallback, useMemo, useState } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StackActions } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { CustomAnimation } from "react-native-animatable";
import { Container, Icon, Spot, Pressable } from "./styles";

const RouteIconNames = {
  0: "home",
  1: "search",
  2: "person",
};

const screenWidth = Dimensions.get("window").width;

const TabBar = function ({ state, navigation }: BottomTabBarProps) {
  const { index: activeIndex, routeNames } = state;
  const [previousIndex, setPreviousIndex] = useState(activeIndex);

  const handleNavigation = useCallback(
    (index: number) => () => {
      if (activeIndex === index) {
        return navigation.dispatch(StackActions.popToTop());
      }

      navigation.navigate(state.routes[index].name);
      setPreviousIndex(activeIndex);
    },
    [activeIndex],
  );

  const renderTabIcon = useCallback(() => {
    return routeNames.map((route, index) => {
      return (
        <Pressable
          key={`${index}-${route}`}
          onPress={handleNavigation(index)}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            paddingBottom: pressed ? 8 : 0,
          })}>
          <Icon
            name={RouteIconNames[index as keyof typeof RouteIconNames]}
            isActive={activeIndex === index}
          />
        </Pressable>
      );
    });
  }, [state]);

  const Animation = useMemo(() => {
    return {
      0: {
        transform: [{ translateX: (screenWidth * (previousIndex - 1)) / 3 }],
        width: 30,
        height: 5,
      },
      0.5: {
        width: 60,
        height: 4,
      },
      1: {
        transform: [{ translateX: (screenWidth * (activeIndex - 1)) / 3 }],
        width: 30,
        height: 5,
      },
    } as CustomAnimation;
  }, [activeIndex]);

  return (
    <Container>
      {renderTabIcon()}
      <Spot animation={Animation} duration={350} easing="linear" />
    </Container>
  );
};

export default TabBar;
