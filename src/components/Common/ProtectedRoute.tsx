import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import { FC } from "react";

type ProtectedRouteProps = {
  isAuth: boolean,
  redirectPath?: string
  children: any
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAuth,
  redirectPath = '/login',
  children,
}) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;