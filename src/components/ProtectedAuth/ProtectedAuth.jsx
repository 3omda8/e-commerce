import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../../context/TokenContext";
import Cookies from "js-cookie";

function ProtectedAuth({ children }) {
  const { token } = useContext(TokenContext);
  if (token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default ProtectedAuth;
