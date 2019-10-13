import React from "react";
import qs from "qs";

import { reducer, initialState, baseUrl } from "./reducer";
import { fetchMovies } from "../../helpers";
import { Movies } from "../../components/Movies/index";
import { Pagination } from "../../components/Pagination/index";
import { Panel } from "../../components/Panel";

export const Home = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const effect = async () => {
      const params = qs.stringify({
        search: state.query,
        sortBy: state.sortBy,
        order: state.order
      });
      const url = `${baseUrl}?${params}`;
      const data = await fetchMovies(url);
      dispatch({ type: "setMoviesData", payload: data });
    };

    effect();
  }, [state.query, state.sortBy, state.order]);

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
      <Panel dispatch={dispatch} />
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
