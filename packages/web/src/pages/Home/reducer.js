export const initialState = {
  endpoint: "http://localhost:3001/movies",
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
    default:
      return state;
  }
};
