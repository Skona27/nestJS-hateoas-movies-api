export const baseUrl = "http://localhost:3001/movies";

export const initialState = {
  query: null,
  endpoint: baseUrl,
  sortBy: null,
  order: null,
  response: {
    totalCount: null,
    perPage: null,
    pageNumber: null,
    movies: null,
    links: null
  }
};

export const reducer = (state, action) => {
  console.log(action);
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
        query: action.payload
      };
    case "setSortBy":
      return {
        ...state,
        response: { ...state.response, movies: null },
        sortBy: action.payload
      };
    case "setOrder":
      return {
        ...state,
        response: { ...state.response, movies: null },
        order: action.payload
      };
    default:
      return state;
  }
};
