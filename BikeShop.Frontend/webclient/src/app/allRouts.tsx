import {OnlyWithoutAuthRout, WorkspaceHeaderProvider} from "../entities/index";
import {createBrowserRouter} from "react-router-dom";
import {Home, LoginPage, MainPage, ProductCatalogPage, RegistrationPage} from "../pages";
import {CheckAuthRout, PublicHeaderProvider} from "../entities";


// @ts-ignore
export const Routs = createBrowserRouter([

    ////                    ////
    ////    Авторизация     ////
    ////                    ////

    {
        path: '/login',
        element: <OnlyWithoutAuthRout>
            <LoginPage/>
        </OnlyWithoutAuthRout>
    },
    {
        path: '/registration',
        element: <OnlyWithoutAuthRout>
            <RegistrationPage/>
        </OnlyWithoutAuthRout>
    },

    ////                                        ////
    ////    Страницы без ограничения доступа    ////
    ////                                        ////

    {
        path: '/',
        element: <PublicHeaderProvider>
            <Home/>
        </PublicHeaderProvider>
    },
    {
        path: '/home',
        element: <PublicHeaderProvider>
            <Home/>
        </PublicHeaderProvider>
    },

    ////                                        ////
    ////    Страницы только для залогиненых     ////
    ////                                        ////

    {
        path: '/mainpage',
        element: <CheckAuthRout>
            <WorkspaceHeaderProvider>
                <MainPage/>
            </WorkspaceHeaderProvider>
        </CheckAuthRout>
    },
    {
        path: '/productcatalog',
        element: <CheckAuthRout>
            <WorkspaceHeaderProvider>
                <ProductCatalogPage/>
            </WorkspaceHeaderProvider>
        </CheckAuthRout>
    },
])