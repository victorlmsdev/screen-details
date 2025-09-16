import { useNavigation } from "@react-navigation/native";
import useTranslation from "~/shared/hooks/useTranslate";
import { useRecentlyViewedStore, useSelectMovieDetails } from "~/shared/stores";
import SectionMovieList from "../SectionMovieList";

const RecentlyViewed = function () {
  const { getPageTranslations } = useTranslation();

  const translations = getPageTranslations("shared") as Translation["shared"];

  const { moviesHistory } = useRecentlyViewedStore();
  const { setId } = useSelectMovieDetails();
  const navigation = useNavigation<any>();

  const handleNavigation = (id: number) => () => {
    setId(id);
    navigation.navigate("MovieDetails");
  };

  if (moviesHistory.length === 0) return null;

  return (
    <SectionMovieList
      isLoading={false}
      onSelectMovie={handleNavigation}
      data={moviesHistory}
      key={"recentlyViewed"}
      title={translations.recentlyViewed}
    />
  );
};

export default RecentlyViewed;
