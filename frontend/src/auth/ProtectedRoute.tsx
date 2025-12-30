import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
  role?: "USER" | "ADMIN";
};

const ProtectedRoute = ({ children, role }: Props) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
