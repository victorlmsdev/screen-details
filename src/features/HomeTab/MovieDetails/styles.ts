import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { SkeletonImage } from "~/shared/components";
const imageHeight = Dimensions.get("window").width / 1.78;

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const BackDropImage = styled(SkeletonImage)`
  width: 100%;
  height: ${imageHeight}px;
`;
