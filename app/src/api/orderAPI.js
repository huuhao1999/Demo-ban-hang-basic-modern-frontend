import checkapi from "./testAPI";
const orderApi = {
    createOrder: async (params) => {
        const url = "/product/buy";
        let res = await checkapi.post(url, { params });
        return res.data;
    },
    updateStatusOrder: async(params) => {
        const url = "/product/update-order-status";
        let res = await checkapi.post(url, { params });
     
        return res.data;
    },
};
export default orderApi;
