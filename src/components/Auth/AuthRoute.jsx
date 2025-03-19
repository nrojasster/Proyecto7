import { useContext, useEffect } from "react";

import { Navigate } from "react-router-dom";
import UserContext from '../../contexts/users/UserContext';

// eslint-disable-next-line react/prop-types
export default function AuthRoute({ component: Component }) {
  const userCtx = useContext(UserContext);
  const { authStatus, verifyingToken } = userCtx;

  useEffect(() => {
    verifyingToken();
  }, [authStatus]);

  return <>{authStatus ? <Navigate replace to="/" /> : <Component />}</>;
}