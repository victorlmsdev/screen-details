import styled from "styled-components/native";
import { Image } from "expo-image";

export const CardContainer = styled.Pressable`
  width: 92px;
  margin-left: 16px;
`;

export const CardImage = styled(Image)`
  width: 100%;
  height: 150px;
`;

export const SubtitleContainer = styled.View`
  padding: 8px 16px 0px;
  width: 100%;
`;
