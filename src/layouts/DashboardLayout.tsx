import { Menu } from "@mui/icons-material";
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
import { AppBar, Drawer } from "components";
import { UserRegistration } from "models";
import { useState } from "react";
import { MENUS, USER_AUTHENTICATION_KEY } from "utils";
import MainLayout from "./MainLayout";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const userInfo: UserRegistration = JSON.parse(
    localStorage.getItem(USER_AUTHENTICATION_KEY) || ""
  );

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <MainLayout>
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
            <IconButton color="inherit">{`Welcome ${userInfo.fullName}`}</IconButton>
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
      </Box>
    </MainLayout>
  );
}

export default DashboardLayout;
