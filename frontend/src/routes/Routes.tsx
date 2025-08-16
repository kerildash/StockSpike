import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SearchPage } from "../pages/SearchPage/SearchPage";
import { CompanyInfoPage } from "../pages/CompanyInfoPage/CompanyInfoPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: 'search',
                element: <SearchPage/>
            },
            {
                path: 'company/:ticker',
                element: <CompanyInfoPage/>
            }
        ]
    }
])