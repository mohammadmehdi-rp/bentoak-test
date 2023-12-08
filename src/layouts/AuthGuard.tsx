import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_AUTHENTICATION_KEY } from "utils";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [initializing, setInitializing] = useState(true);
  const userStore = localStorage.getItem(USER_AUTHENTICATION_KEY);

  useEffect(() => {
    if (!userStore) {
      navigate("/auth/login");
    } else {
      setInitializing(false);
    }
  }, [navigate, userStore]);

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!initializing && userStore) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
