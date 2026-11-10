import {createBrowserRouter, Navigate} from 'react-router-dom';
import MainLayout from "../layouts/MainLayout.tsx";
import DashboardPage from '../pages/DashboardPage';
import CreateEventPage from "../pages/events/createFormPage.tsx";
import EventsPage from "../pages/events/EventsPage.tsx";
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
        {
                path: '/',
                element: <MainLayout />,
                errorElement: <Navigate to="/404" replace />,
                children: [
                        {
                                index: true,
                                element: <Navigate to="/dashboard" replace />,
                        },
                        {
                                path: 'dashboard',
                                element: <DashboardPage />,
                                errorElement: <Navigate to="/404" replace />
                        },
                        {
                                path: 'events',
                                element: <EventsPage />,
                                errorElement: <Navigate to="/404" replace />,
                                children: [
                                        {
                                                path: 'create',
                                                element: <CreateEventPage  />,
                                                errorElement: <Navigate to="/404" replace />,
                                        }
                                ]
                        },
                        {
                                path: '/404',
                                element: <NotFoundPage />
                        },
                ],
        },

]);
