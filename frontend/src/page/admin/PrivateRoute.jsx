import { useDispatch, useSelector } from 'react-redux';
import { selectisAuthenticated } from '../../redux/features/auth/authSelector';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { useEffect } from 'react';
import { checkAuthStatus } from '../../redux/features/auth/authApi';

const PrivateRoute = () => {
  const isAuthenticated = useSelector(selectisAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return <AdminLayout />;
};

export default PrivateRoute;
