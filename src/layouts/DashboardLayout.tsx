import { Logout, Menu } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { AlertModal, AppBar, Drawer } from "components";
import { UserRegistration } from "models";
import { useState } from "react";
import { MENUS, USER_AUTHENTICATION_KEY } from "utils";
import AuthGuard from "./AuthGuard";
import { useNavigate } from "react-router-dom";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const userInfo: UserRegistration = JSON.parse(
    localStorage.getItem(USER_AUTHENTICATION_KEY) ?? "{}"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_AUTHENTICATION_KEY);
    setIsModalOpen(false);
    navigate("/auth/login");
  };

  return (
    <AuthGuard>
      <Box sx={{ display: "flex" }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton onClick={() => setIsModalOpen(true)} color="error">
              <Logout color="error" sx={{ marginRight: "4px" }} />
              Logout
            </IconButton>
            <IconButton color="inherit">{`Welcome ${userInfo?.fullName}`}</IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {MENUS.map((menu, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                fontWeight: "500",
              }}
            >
              <Link
                href={menu.path}
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                {menu.title}
              </Link>
            </Box>
          ))}
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {children}
            </Paper>
          </Container>
        </Box>
        <AlertModal
          open={isModalOpen}
          title={"Logout"}
          description={
            "you are about to logout of your account, are you sure ?"
          }
          agreeButton={{
            name: "Logout",
            onClick: handleLogout,
          }}
          disagreeButton={{
            name: "Cancel",
            onClick: () => {
              setIsModalOpen(false);
            },
          }}
        />
      </Box>
    </AuthGuard>
  );
}

export default DashboardLayout;
