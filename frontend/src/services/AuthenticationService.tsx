import axios from "axios";
import type { UserAuthData } from "../models/UserAuthData";
import { handleError } from "../helpers/ExceptionHandler";

const api = "https://localhost:7026/api";

export const loginWithApi = async (username: string, password: string) => {
    try {
        const loginDto = {
            username: username,
            password: password
        };
        
        const data = await axios.post<UserAuthData>(api + '/accounts/login', loginDto);
        return data;
    } catch (error) {
        handleError(error);
    };
};

export const registerWithApi = async (username: string, email: string, password: string) => {
    try {
        const registerDto = {
            username: username,
            emailAddress: email,
            password: password
        };

        // TODO: add error handling
        const data = await axios.post<UserAuthData>(api + '/accounts/register', registerDto);
        return data;
    } catch (error) {
        handleError(error);
    };
};