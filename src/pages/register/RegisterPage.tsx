import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { validate } from "class-validator";
import { AuthLayout } from "layouts";
import { User } from "models";
import { useState } from "react";

function RegisterPage() {
  const [inputErrors, setInputErrors] = useState<User>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let user = new User();
    user.email = data.get("email")?.toString() || "";
    user.fullName = data.get("fullName")?.toString() || "";
    user.password = data.get("password")?.toString() || "";

    validate(user).then((errors) => {
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

        localStorage.setItem("bentoak-test-user", JSON.stringify(user));
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
          bentoak-test Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="FullName"
            name="fullName"
            autoComplete="fullName"
            autoFocus
            error={!!inputErrors?.fullName}
            helperText={inputErrors?.fullName}
          />
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
            <Link href="#" variant="body2">
              {"Already have an account? Login"}
            </Link>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
}

export default RegisterPage;
