import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login.jsx';
import Dashboard from './PhoneList';

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Login />,
        },
        {
            path: 'login',
            element: <Dashboard />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
