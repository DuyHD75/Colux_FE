import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedEmployeeRoute = ({ children }) => {
  const navigate = useNavigate();
  const employee  = localStorage.getItem("employee");
  const admin  = localStorage.getItem("admin");
  useEffect(() => {
    if (!employee && !admin)  {
      navigate('/login');
    }
  }, [employee, admin, navigate]);

  return (employee || admin) ? children : null;
};

export default ProtectedEmployeeRoute; 
