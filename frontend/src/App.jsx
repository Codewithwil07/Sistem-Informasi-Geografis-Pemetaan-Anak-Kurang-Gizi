import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Hompage from './page/Hompage';
import DataListPage from './page/DataListPage';
import DataGrafikPage from './page/DataGrafikPage';
import Layout from './page/layout';
import AdminLayout from './page/admin/AdminLayout';
import Dashboard from './page/admin/Dashboard';
import DataEdit from './page/admin/DataEdit';
import DataList from './page/admin/DataList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <h1 className='text-center font-bold text-4xl'>Error 404 Not Found</h1>
    ),
    children: [
      {
        path: '/',
        element: <Hompage />,
      },
      {
        path: 'data-list',
        element: <DataListPage />,
      },
      {
        path: 'data-grafik',
        element: <DataGrafikPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        index: true,
      },
      {
        path: 'data-edit',
        element: <DataEdit />,
      },
      {
        path: 'data-list',
        element: <DataList />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
