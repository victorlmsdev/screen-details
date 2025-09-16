import styled from "styled-components/native";
import { ViewProps } from "react-native";

export type BoxProps = ViewProps & {
  width?: number | string;
  height?: number | string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  margin?: number | string;
  padding?: number | string;
  flex?: number;
};

export const View = styled.View<BoxProps>`
  ${({ flex }) => flex && `flex: ${flex};`}
  width: ${({ width }) =>
    !width ? "" : typeof width === "string" ? width : `${width}px`};

  height: ${({ height }) =>
    !height ? "" : typeof height === "string" ? height : `${height}px`};

  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};

  justify-content: ${({ justifyContent }) => justifyContent};

  margin: ${({ margin }) =>
    !margin ? "0px" : typeof margin === "string" ? margin : `${margin}px`};

  padding: ${({ padding }) =>
    !padding ? "0px" : typeof padding === "string" ? padding : `${padding}px`};
`;
