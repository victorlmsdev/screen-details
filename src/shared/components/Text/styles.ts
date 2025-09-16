import { TextProps } from "react-native";
import styled, { css } from "styled-components/native";
import { DefaultTheme } from "styled-components/native/dist/types";

export type StyledTextProps = TextProps & {
  variant?:
    | "body"
    | "title"
    | "megaTitle"
    | "subtitle"
    | "caption"
    | "button"
    | "sectionTitle";
  color?: keyof DefaultTheme["colors"];
};

export const StyledText = styled.Text<StyledTextProps>`
  ${({ variant, color, theme }) => {
    const fontFamily =
      theme?.font[variant as keyof typeof theme.font] ?? theme.font.default;

    const fontSize =
      theme.fontSize[variant as keyof typeof theme.fontSize] ?? 12;

    return css`
      color: ${color ? theme.colors[color] : theme.colors.onBackground};
      font-family: ${fontFamily};
      font-size: ${fontSize}px;
    `;
  }}
`;
