import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  Alert,
  Box,
  Button,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { validate } from "class-validator";
import { USER_AUTHENTICATION_KEY } from "const";
import { AuthLayout } from "layouts";
import { UserLogin, UserRegistration } from "models";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | undefined>();

  const resolver = classValidatorResolver(UserLogin);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({ resolver, mode: "onChange" });

  const handleOnSubmit = (user: UserLogin) => {
    validate(user).then((errors) => {
      if (errors.length > 0) {
        const errorsData: any = {};
        errors.map(
          (error) =>
            (errorsData[error.property] =
              error.constraints?.[Object.keys(error.constraints)[0]])
        );
      } else {
        const userStore = localStorage.getItem(USER_AUTHENTICATION_KEY);
        if (!userStore) {
          setMessage("Please Register First!");
          return;
        }
        const userStoreData: UserRegistration = JSON.parse(userStore);
        userStoreData.email === user.email &&
        userStoreData.password === user.password
          ? navigate("/")
          : setMessage("Please Register First!");
      }
    });
  };

  return (
    <AuthLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          bentoak-test Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleOnSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("email")}
            margin="normal"
            required
            fullWidth
            type="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />
          <TextField
            {...register("password")}
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
          >
            Submit
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link href={"/auth/register"} variant="body2">
              {"Don't have an account? Register"}
            </Link>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => {
          setMessage(undefined);
        }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
}

export default LoginPage;
