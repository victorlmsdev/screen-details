import styled from "styled-components/native";

export const Backdrop = styled.Pressable`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  width: 75%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border: dashed 8px;
  align-items: center;
  justify-content: center;
`;
