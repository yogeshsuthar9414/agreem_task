import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";
import storageService from "../storage/storageService";


const BASE_URL = "https://dummyjson.com";


const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
        Authorization: ""
    },
});

// ==========================
// REQUEST INTERCEPTOR
// ==========================
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {
            const token = await storageService.provideToken;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }


            return config;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    (error) => Promise.reject(error)
);

// ==========================
// RESPONSE INTERCEPTOR
// ==========================
api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError<any>) => {
        const originalRequest: any = error.config;

        // Network Error
        if (!error.response) {
            // Here Wirte code native on login
            // ------------------
            return Promise.reject({
                success: false,
                status: 0,
                message: "No Internet Connection",
            });
        }

        // Access Token Expired
        if (
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {

                // Write Refresh Token Logic
                return Promise.reject(error);
            } catch (e) {
                await storageService.clearAll();

                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    }
);


export const apiRequest = async (
    method: any,
    endpoint: any,
    data: any = null,
    params = {},
    headers = {},
) => {


    try {
        const payload = {
            ...data,
        };


        // dispatch(handleCheckSum(checksum));
        const response = await api({
            method,
            url: endpoint,
            data: payload,
            params,
            headers,
        });

        return response.data;
    } catch (error: any) {
        console.log("API ERROR =>", error);

        if (error.response) {
            return {
                success: false,
                status: error.response.status,
                message:
                    error.response.data?.message ||
                    error.response.data?.title ||
                    "Something went wrong",
                data: error.response.data,
            };
        }

        return {
            success: false,
            status: 500,
            message: error.message || "Unknown Error",
        };
    }
};
