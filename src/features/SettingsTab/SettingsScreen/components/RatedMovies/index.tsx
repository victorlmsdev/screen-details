import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import useGetRatedMovies from "~/features/SettingsTab/hooks/useGetRatedMovies";
import { SectionMovieList } from "~/shared/components";
import { useSelectMovieDetails } from "~/shared/stores";

const RatedMovies = () => {
  const navigation = useNavigation<any>();
  const movieStore = useSelectMovieDetails();
  const { data: moviesPages, isPending } = useGetRatedMovies();

  const handleSelectMovie = useCallback(
    (id: number) => () => {
      movieStore.reset();
      movieStore.setId(id);
      navigation.navigate("MovieDetails");
    },
    [],
  );

  if (!moviesPages?.pages || moviesPages?.pages[0].length === 0) return null;

  return (
    <SectionMovieList
      title="Rated Movies"
      data={moviesPages.pages[0].results ?? []}
      onSelectMovie={handleSelectMovie}
      isLoading={isPending}
    />
  );
};

export default RatedMovies;
