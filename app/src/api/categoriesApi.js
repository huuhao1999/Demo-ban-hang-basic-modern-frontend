import axiosClient from "./axiosClient";
import checkapi from "./testAPI";
const categoryApi = {
  getAll: () => {
    const url = "/Brands";
    return axiosClient.get(url);
  },
  getCategories: () => {
    const url = "/categories";
    return checkapi.get(url);
  },
  get: (id) => {
    const url = `/categories/${id}`;
    return checkapi.get(url);
  },
  testAI: () => {
    const url = `/categories`;
    return checkapi.get(url);
  },
};

export default categoryApi;
