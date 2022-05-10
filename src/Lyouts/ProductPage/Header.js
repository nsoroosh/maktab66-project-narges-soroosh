import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../Assets/images/artxlogo.png";
import { Link, Navigate, Outlet } from "react-router-dom";
const pages = ["محصولات ", "مدیریت ", "سبد خرید "];
const pageslink = ["card", "admin", "products"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    <Navigate to={"products"} replace />;
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
              <Link to={"/"}>
                <img src={logo} alt="Logo" width="50" height="50" />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                
                  <MenuItem key='admin' onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/admin">مدیریت</Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem key="products" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/products">محصولات</Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem key='card' onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/card">سبد خرید</Link>
                    </Typography>
                  </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <img src={logo} alt="Logo" width="50" height="50" />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key="admin"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography textAlign="center">
                  <Link to="/admin">مدیریت</Link>
                </Typography>
              </Button>
              <Button
                key="card"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography textAlign="center">
                  <Link to='/card'>سبد خرید</Link>
                </Typography>
              </Button>
              <Button
                key="products"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography textAlign="center">
                  <Link to='/products'>محصولات</Link>
                </Typography>
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}
              >
                ARTXMODE
              </Typography>
            </Box>
          </Toolbar>
        </Container>
        <Outlet />
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
