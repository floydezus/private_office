import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import {FC, ReactChildren} from "react";

type ProtectedRouteProps = {
  isAuth: boolean,
  redirectPath?: string
  children: JSX.Element
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAuth,
  redirectPath = '/login',
  children
}) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
