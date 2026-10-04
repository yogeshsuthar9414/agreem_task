import { apiRequest } from "../../../services/api/apiRequest";
import * as urls from "../../../services/api/urls";
import toastNotify from "../../../utils/ToastNotify";

export const getProducts = async () => {
    try {
        const payload = {};

        console.log("urls.products", urls.products);

        const result = await apiRequest("GET", urls.products, payload);
        if (result.products) {
            toastNotify("Data is receive", 'error');
            console.log("result.products", result.products);

            return result.products;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error)
    }
}