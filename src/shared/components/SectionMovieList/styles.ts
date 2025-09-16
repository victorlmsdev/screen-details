import { Image } from "expo-image";
import styled from "styled-components/native";

export const Card = styled.Pressable`
  width: 92px;
  margin-left: 16px;
  margin-top: 8px;
`;

export const CardImage = styled(Image)`
  width: 100%;
  min-height: 130px;
`;

export const SubtitleContainer = styled.View`
  padding: 0px 16px 0px;
  margin-top: 8px;
  width: 100%;
`;
