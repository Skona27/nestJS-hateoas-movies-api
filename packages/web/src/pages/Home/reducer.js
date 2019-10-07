const baseUrl = "http://localhost:3001/movies";

export const initialState = {
  query: null,
  endpoint: baseUrl,
  response: {
    totalCount: null,
    perPage: null,
    pageNumber: null,
    movies: null,
    links: null
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setMoviesData":
      return { ...state, response: action.payload };
    case "setApiEndpoint":
      return {
        ...state,
        endpoint: action.payload,
        response: { ...state.response, movies: null }
      };
    case "setQuery":
      return {
        ...state,
        response: { ...state.response, movies: null },
        endpoint: `${baseUrl}?search=${action.payload}`
      };
    default:
      return state;
  }
};
