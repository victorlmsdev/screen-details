import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { SkeletonImage } from "~/shared/components";

const imageHeight = Dimensions.get("window").width / 1.78;

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const RecommendationContainer = styled.View`
  width: 100%;
  height: ${imageHeight - 32}px;
  padding: 0px 16px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
`;

export const RecommendationImage = styled(SkeletonImage)`
  width: 100%;
  height: 100%;
`;

export const SubtitleContainer = styled.View`
  padding: 8px 16px;
  width: 100%;
`;
