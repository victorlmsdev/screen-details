import { View } from "~/shared/components/Box/styles";

import Icon from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "react-native";
import { Image } from "expo-image";
import { BASE_IMAGE_URL } from "@env";
import { useMemo } from "react";
import { SkeletonImage } from "~/shared/components";

const Avatar = function ({ imageUrl }: { imageUrl?: string }) {
  const colorScheme = useColorScheme();

  const tmdbImageUrl = useMemo(
    () => `${BASE_IMAGE_URL}/w300_and_h300_face${imageUrl}`,
    [imageUrl],
  );

  return (
    <View>
      {imageUrl ? (
        <SkeletonImage
          source={{ uri: tmdbImageUrl }}
          style={{ width: 128, height: 128 }}
        />
      ) : (
        <Icon
          name="person"
          size={128}
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
      )}
    </View>
  );
};

export default Avatar;
