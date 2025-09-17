import { Image, ImageErrorEventData, ImageProps } from "expo-image";
import SkeletonComponent from "../Skeleton";
import { useMemo, useState } from "react";
import { UndefinedCover, UndefinedProfile } from "~/shared/assets";

type Props = {
  imageType?: "card" | "backdrop";
} & ImageProps;

const SkeletonImage = function ({ imageType = "card", ...props }: Props) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const errorImage = useMemo(() => {
    if (imageType === "backdrop") return UndefinedCover;

    return UndefinedProfile;
  }, [imageType]);

  const handleError = (event: ImageErrorEventData) => {
    if (typeof props.onError === "function") return props.onError(event);
    setError(true);
  };

  return (
    <SkeletonComponent show={!loaded}>
      <Image
        {...props}
        source={error ? errorImage : props.source}
        onLoadEnd={() => setLoaded(true)}
        onLoadStart={() => setLoaded(false)}
        onError={handleError}
      />
    </SkeletonComponent>
  );
};

export default SkeletonImage;
