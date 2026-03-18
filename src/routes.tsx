import { createBrowserRouter } from 'react-router';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import QRNavigationPage from './pages/QRNavigationPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    path: '/',
    element: <DashboardPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />
  },
  {
    path: '/qr-navigate',
    element: <QRNavigationPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);
