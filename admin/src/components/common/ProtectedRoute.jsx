import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const admin  = localStorage.getItem("admin");
  console.log(admin);
  useEffect(() => {
    if (!admin) {
      navigate('/login');
    }
  }, [admin, navigate]);

  return admin ? children : null;
};

export default ProtectedRoute; 
