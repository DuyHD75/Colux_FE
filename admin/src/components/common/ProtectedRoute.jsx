import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const admin  = localStorage.getItem("admin");
  const employee  = localStorage.getItem("employee");
  useEffect(() => {
    if (!admin) {
      if(!employee) {
        navigate('/login');
      } else {
        navigate('/manage-products');
      }
      
    }
  }, []);

  return admin ? children : null;
};

export default ProtectedRoute; 
