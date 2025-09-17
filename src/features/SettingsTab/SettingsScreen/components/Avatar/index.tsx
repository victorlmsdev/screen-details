import { Box } from "~/shared/components/";

import { BASE_IMAGE_URL } from "@env";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";
import { SkeletonImage } from "~/shared/components";

const Avatar = function ({ imageUrl }: { imageUrl?: string }) {
  const colorScheme = useColorScheme();

  const tmdbImageUrl = useMemo(
    () => `${BASE_IMAGE_URL}/w300_and_h300_face${imageUrl}`,
    [imageUrl],
  );

  return (
    <Box style={{ overflow: "hidden" }}>
      {imageUrl ? (
        <Box key={"avatar-img"} entering={FadeInRight} exiting={FadeOutRight}>
          <SkeletonImage
            source={{ uri: tmdbImageUrl }}
            style={{ width: 128, height: 128 }}
          />
        </Box>
      ) : (
        <Box key={"avatar-icon"} entering={FadeInLeft} exiting={FadeOutLeft}>
          <Icon
            name="person"
            size={128}
            color={colorScheme === "dark" ? "#fff" : "#000"}
          />
        </Box>
      )}
    </Box>
  );
};

export default Avatar;
