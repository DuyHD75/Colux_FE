import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedEmployeeRoute = ({ children }) => {
  const navigate = useNavigate();
  const employee  = localStorage.getItem("employee");
  useEffect(() => {
    if (!employee) {
      navigate('/login');
    }
  }, [employee, navigate]);

  return employee ? children : null;
};

export default ProtectedEmployeeRoute; 
