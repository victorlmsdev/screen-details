import { ButtonProps } from "react-native";
import styled from "styled-components/native";

export type StyledButtonProps = Omit<ButtonProps, "title"> & {
  width?: string | number;
  loading?: boolean;
};

export const StyledButton = styled.Pressable.attrs(({ theme }) => ({
  android_ripple: { color: theme.colors.buttonRipple },
}))<StyledButtonProps>`
  padding: 0px 8px;
  height: 35px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.onBackground};
  ${({ width }) =>
    width && `width: ${typeof width === "string" ? width : `${width}px`};`}
`;
