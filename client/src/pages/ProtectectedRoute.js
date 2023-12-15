import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { toggleUser } = useSelector((store) => store.user);
  if (!toggleUser) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;