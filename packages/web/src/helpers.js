import axios from "axios";

export const fetchMovies = async url => {
  const [response] = await Promise.all([
    axios.get(url),
    setTimeoutPromise(500)
  ]);
  return response.data;
};

export const setTimeoutPromise = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
