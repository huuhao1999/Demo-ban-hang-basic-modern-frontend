import axiosClient from "./axiosClient";
import checkapi from "./testAPI";
import { entityToFormProduct } from "../helpers/convert";
const productApi = {
  getAll: async (params) => {
    const url = "/product";
    let res = await checkapi.get(url, { params });
    console.log(params);
    let data = [];
    let len = 0
    if (res.data) {
      data = res.data;
      len = res.data.length
    }
    return { totalRow: len, data: entityToFormProduct(data) }
  },
  get: async(id) => {
    const url = `/product/detail`;
    let params = {
      productId: id
    }
    let res = await checkapi.get(url, { params });
    let data = {};
    if (res.data) {
      let temp = entityToFormProduct([res.data]);
      data = temp[0]
    }
    return data;
  },
};

export default productApi;
