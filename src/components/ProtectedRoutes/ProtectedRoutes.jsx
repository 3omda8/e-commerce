import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../../context/TokenContext";
import Cookies from "js-cookie";

function ProtectedRoutes({ children }) {
  const { token } = useContext(TokenContext);
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;
