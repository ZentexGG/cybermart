import React, {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Pages/Layout/Layout";
import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductCard from "./Components/ProductCard/ProductCard";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {CarouselComponent} from "./Components/Carousel/CarouselComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import {RegisterFormComponent} from "./Components/RegisterForm/RegisterFormComponent";
import {LoginFormComponent} from "./Components/LoginForm/LoginFormComponent";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: (
                    <div className="regele">
                        <CarouselComponent></CarouselComponent>
                    </div>
                ),
            },
            {
                path: "/nebunie",
                element: (
                    <div className="Copil">
                        <LoginFormComponent></LoginFormComponent>
                    </div>
                ),
            },
        ],
    },
]);
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
).render(
    <StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <RouterProvider router={router}/>
        </DevSupport>
    </StrictMode>
);
