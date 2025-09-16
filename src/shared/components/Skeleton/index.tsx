import React, { FC, Fragment, PropsWithChildren } from "react";
import { Skeleton } from "moti/skeleton";
import { MotiSkeletonProps } from "node_modules/moti/build/skeleton/types";
import { useColorScheme } from "react-native";

const SkeletonComponent: FC<
  PropsWithChildren<Omit<MotiSkeletonProps, "Gradient">>
> = function ({ children, ...props }) {
  const colorScheme = useColorScheme();

  // if (__DEV__) return <Fragment>{children}</Fragment>;

  return (
    <Skeleton {...props} colorMode={colorScheme ?? undefined} radius={0}>
      {children}
    </Skeleton>
  );
};

export default SkeletonComponent;
