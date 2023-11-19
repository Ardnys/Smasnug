import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import AddContact from './AddContact.jsx';
import Edit from './Edit.jsx';

const MyRouter = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Login />,
        },
        {
            path: 'dashboard',
            element: <Dashboard />,
        },
        {
            path: 'add',
            element: <AddContact />,
        },
        {
            path: 'edit/:id',
            element: <Edit />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default MyRouter;
