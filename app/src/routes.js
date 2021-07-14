import { Navigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Header from "./components/Header";
const routes = [
  {
    path: '/',
    element: <Header />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
