import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { validate } from "class-validator";
import { USER_AUTHENTICATION_KEY } from "const";
import { AuthLayout } from "layouts";
import { UserRegistration } from "models";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const resolver = classValidatorResolver(UserRegistration);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistration>({ resolver, mode: "onChange" });

  const handleOnSubmit = (user: UserRegistration) => {
    validate(user).then((errors) => {
      if (errors.length > 0) {
        const errorsData: any = {};
        errors.map(
          (error) =>
            (errorsData[error.property] =
              error.constraints?.[Object.keys(error.constraints)[0]])
        );
      } else {
        localStorage.setItem(USER_AUTHENTICATION_KEY, JSON.stringify(user));

        navigate("/auth/login");
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
        <Box
          component="form"
          onSubmit={handleSubmit(handleOnSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("fullName")}
            margin="normal"
            fullWidth
            label="FullName"
            autoComplete="fullName"
            autoFocus
            error={!!errors?.fullName}
            helperText={errors?.fullName?.message}
          />
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
            <Link href={"/auth/login"} variant="body2">
              {"Already have an account? Login"}
            </Link>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
}

export default RegisterPage;
