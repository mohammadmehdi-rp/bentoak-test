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
import { User } from "models";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [inputErrors, setInputErrors] = useState<User>();
  const [message, setMessage] = useState<string | undefined>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let user = new User();
    user.email = data.get("email")?.toString() || "";
    user.password = data.get("password")?.toString() || "";

    validate(user, { skipMissingProperties: true }).then((errors) => {
      if (errors.length > 0) {
        const errorsData: any = {};
        errors.map(
          (error) =>
            (errorsData[error.property] =
              error.constraints?.[Object.keys(error.constraints)[0]])
        );

        setInputErrors(errorsData);
      } else {
        setInputErrors(undefined);

        const user = localStorage.getItem(USER_AUTHENTICATION_KEY);

        if (user) {
          navigate("/");
        } else {
          setMessage("Please Register First!");
        }
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!inputErrors?.email}
            helperText={inputErrors?.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!inputErrors?.password}
            helperText={inputErrors?.password}
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
