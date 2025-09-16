import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  If,
  Loader,
  SectionActingPersonList,
  SectionContainer,
  SectionMovieList,
  Separator,
  Text,
} from "~/shared/components";
import useTranslation from "~/shared/hooks/useTranslate";
import { useSelectMovieDetails, useSelectPersonDetails } from "~/shared/stores";
import SearchInput from "./components/SearchInput";
import { useSearchMovies, useSearchPeople } from "./queries";
import { Container, ScrollContainer } from "./styles";

const Search = function () {
  const { getPageTranslations } = useTranslation();
  const translation = getPageTranslations("search") as Translation["search"];

  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation<NavigationProp<StackParamsList>>();

  const movieStore = useSelectMovieDetails();
  const personStore = useSelectPersonDetails();

  const {
    data: movies,
    isPending: isMovieQueryPending,
    fetchNextPage: fetchMovieNextPage,
  } = useSearchMovies(searchQuery);

  const {
    data: people,
    isPending: isPeopleQueryPending,
    fetchNextPage: fetchPeopleNextPage,
  } = useSearchPeople(searchQuery);

  const handleNavigation = useCallback(
    (id: number, type: "Movie" | "Person") => () => {
      let routeName: keyof StackParamsList;
      switch (type) {
        case "Movie":
          movieStore.reset();
          movieStore.setId(id);
          routeName = "MovieDetails";
          break;
        case "Person":
          personStore.reset();
          personStore.setId(id);
          routeName = "PersonDetails";
          break;
      }
      if (routeName && routeName.length > 0) navigation.navigate(routeName);
    },
    [],
  );

  return (
    <Container>
      <ScrollContainer>
        <SectionContainer style={{ marginTop: 16 }}>
          <Separator variant="bold" />
          <SearchInput onChange={setSearchQuery} />
        </SectionContainer>
        <If
          conditional={
            !isMovieQueryPending &&
            !isPeopleQueryPending &&
            searchQuery.length > 0 &&
            ((!movies && !people) ||
              (movies?.pages[0]?.total_results == 0 &&
                people?.pages[0]?.total_results == 0))
          }>
          <SectionContainer margin={"16px 0px"} alignItems="center">
            <Text>{translation.noResults}</Text>
          </SectionContainer>
        </If>
        <If
          conditional={
            searchQuery.length > 0 &&
            (isMovieQueryPending || isPeopleQueryPending)
          }>
          <Loader
            size="large"
            loaderProps={{ style: { marginTop: 16 } }}
            isLoading
          />
        </If>
        <If
          conditional={
            searchQuery.length > 0 && movies?.pages[0]?.total_results > 0
          }>
          <SectionMovieList
            title={translation.movieSectionTitle}
            data={movies?.pages.map(page => page.results).flat()}
            flatListProps={{ onEndReached: () => fetchMovieNextPage }}
            isLoading={isMovieQueryPending}
            onSelectMovie={id => handleNavigation(id, "Movie")}
          />
        </If>
        <If
          conditional={
            searchQuery.length > 0 && people?.pages[0]?.total_results > 0
          }>
          <SectionActingPersonList
            title={translation.peopleSectionTitle}
            data={people?.pages.map(page => page.results).flat()}
            flatListProps={{ onEndReached: () => fetchPeopleNextPage }}
            isLoading={isPeopleQueryPending}
            onPress={id => handleNavigation(id, "Person")}
          />
        </If>
      </ScrollContainer>
    </Container>
  );
};

export default Search;
