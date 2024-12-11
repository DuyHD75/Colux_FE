import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return user ? children : null;
};

export default ProtectedRoute;
