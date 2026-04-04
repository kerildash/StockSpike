import { type FC, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/useAuth";

interface IProtectedRouteProps {
    children: ReactNode
};

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    
    console.log(isLoggedIn());
    if(isLoggedIn()) {
        return (
        <>{ children }</>
        );
    };

    return (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};
