import axios from "axios";
import { handleError } from "../helpers/ExceptionHandler";
import type { StockResponse } from "../models/StockResponse";

const api = "https://localhost:7026/api";

export const addToPortfolioWithApi = async (ticker: string) => {
    try {        
        const data = await axios.post(`${api}/portfolio/${ticker}`);
        return data;
    } catch (error) {
        handleError(error);
    };
};

export const deleteFromPortfolioWithApi = async (ticker: string) => {
    try {        
        const data = await axios.delete(`${api}/portfolio/${ticker}`);
        return data;
    } catch (error) {
        handleError(error);
    };
};

export const getPortfolioWithApi = async () => {
    try {        
        const data = await axios.get<StockResponse[]>(`${api}/portfolio/`);
        return data;
    } catch (error) {
        handleError(error);
    };
};