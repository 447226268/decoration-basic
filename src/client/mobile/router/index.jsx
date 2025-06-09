import {
    createBrowserRouter,
} from "react-router";
import App from "@mobile/App";
import { Home } from "@mobile/containers"

export default createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "home",
                Component: Home,
            },
        ]
    },
]);