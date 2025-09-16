import { Image } from "expo-image";
import styled from "styled-components/native";
import { Column } from "~/shared/components";

export const CardImage = styled(Image)`
  width: 60px;
  height: 60px;
`;

export const CardContainer = styled(Column)`
  margin-left: 16px;
  margin-top: 16px;
  align-items: flex-start;
`;
