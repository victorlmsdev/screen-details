import { Image } from "expo-image";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { SkeletonImage } from "~/shared/components";

export const Container = styled.ScrollView`
  flex: 1;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.background};
`;
const width = Dimensions.get("window").width;

export const ProfileImage = styled(SkeletonImage)`
  height: ${(width * 600) / 900}px;
`;
