import React from "react";

import { reducer, initialState } from "./reducer";
import { fetchMovies } from "../../helpers";
import { Movies } from "../../components/Movies/index";
import { Pagination } from "../../components/Pagination/index";

export const Home = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const effect = async () => {
      const data = await fetchMovies(state.endpoint);
      dispatch({ type: "setMoviesData", payload: data });
    };

    effect();
  }, [state.endpoint]);

  const changePage = React.useCallback(url => {
    dispatch({ type: "setApiEndpoint", payload: url });
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>Movies Catalog</h1>

      <Movies movies={state.response.movies} />

      <Pagination
        changePage={changePage}
        links={state.response.links}
        pageNumber={state.response.pageNumber}
        totalCount={state.response.totalCount}
        perPage={state.response.perPage}
      />
    </>
  );
};
