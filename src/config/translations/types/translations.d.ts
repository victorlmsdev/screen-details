interface Translation {
  shared: {
    genericError: string;
    apiError: string;
    loading: string;
    recentlyViewed: string;
  };
  home: {
    recomendation: string;
    recomendationCallToAction: string;
    trending: string;
    nowTheaters: string;
    topRated: string;
  };
  movieDetails: {
    minutes: string;
    cast: string;
    crew: string;
    votes: string;
    budget: string;
    revenue: string;
    similarMovies: string;
    whereToWatch: string;
    trailer: string;
    noRating: string;
    usersRating: string;
    ratingCTA: string;
    changeRatingCTA: string;
    ratingModalTitle: string;
    ratingModalDesc: string;
    ratingModalResetLabel: string;
    ratingModalCancelBt: string;
    ratingModalConfirmBt: string;
  };
  personDetails: {
    showFullBiographyButtonLabel: string;
    hideFullBiographyButtonLabel: string;
    biographyTitle: string;
    gender: string;
    birthday: string;
    deathday: string;
    knownFor: string;
    origin: string;
    knownCredits: string;
    cast: string;
    crew: string;
    alsoKnownAs: string;
  };
  search: {
    placeholder: string;
    noResults: string;
    movieSectionTitle: string;
    peopleSectionTitle: string;
  };
  settings: {
    informationTitle: string;
    description1: string;
    description2: string;
    description3: string;
    dataSourceTitle: string;
    dataSource: string;
    dataSourceDescription: string;
    technologiesTitle: string;
    mainTechnology: string;
    apiManagementTitle: string;
    apiManagement: string;
    stateManagementTitle: string;
    stateManagement: string;
    structureTitle: string;
    structure: string;
    otherTechnologiesTitle: string;
    otherTechnologies: string;
    comingSoonTitle: string;
    comingSoon: string;
    contactMeTitle: string;
    thanks: string;
    developerLabel: string;
    developerName: string;
    versionLabel: string;
  };
  profile: {
    signInButtonLabel: string;
    name: string;
    tmdbUser: string;
    email: string;
    signOutCTA: string;
    signoutModalTitle: string;
    signoutModalDescription: string;
    signoutModalCancelBt: string;
    signoutModalConfirmBt: string;
  };
}

interface PageTranslation {
  [key: string]: string;
}
