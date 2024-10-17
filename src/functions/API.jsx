import { getFetch } from "./Function";

export const getRecipesAPI = () => {
  return new Promise((resolve, reject) => {
    getFetch(process.env.REACT_APP_API_ENDPOINT_URL + `/api/recipes`)
      .then((res) => {
        // return the data
        resolve(res);
      })
      .catch(() => {
        // return an error message
        reject("Error: Something went wrong while adding a new product.");
      });
  });
};

export const getRecipesDetailsAPI = (id) => {
  return new Promise((resolve, reject) => {
    getFetch(process.env.REACT_APP_API_ENDPOINT_URL + `/api/recipes/${id}`)
      .then((res) => {
        // return the data
        resolve(res);
      })
      .catch(() => {
        // return an error message
        reject("Error: Something went wrong while adding a new product.");
      });
  });
};
