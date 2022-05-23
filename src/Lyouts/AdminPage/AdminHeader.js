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
import { Link, NavLink, Outlet } from "react-router-dom";
const pages = ["سفارش ها  ", "کالا ها ", "موجودی و قیمت ها   "];
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
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor:"white" , color:"black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <Link to={"/"} >
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
              <MenuItem key=" orders" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link to="/orders">سفارش ها</Link>
                </Typography>
              </MenuItem>
              <MenuItem key="admin" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link to="/admin">کالا ها </Link>
                </Typography>
              </MenuItem>
              <MenuItem key="price_stock " onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link to="/price_stock "> موجودی و قیمت ها </Link>
                </Typography>
              </MenuItem>
            </Menu>
            <Outlet />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <img src={logo} alt="Logo" width="50" height="50" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="manage orders"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Typography textAlign="center">
                <Link to="/orders">سفارش ها</Link>
              </Typography>
            </Button>
            <Button
              key="admin"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Typography textAlign="center">
                <Link to="/admin" >کالا ها </Link>
              </Typography>
            </Button>
            <Button
              key="price_stock page"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Typography textAlign="center">
                <Link to="/price_stock">موجودی و قیمت ها</Link>
              </Typography>
            </Button>
            <Button
              key="back"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Typography textAlign="center">
              <Link to={"/"}>بازگشت به سایت</Link>

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
    </AppBar>
  );
};
export default ResponsiveAppBar;
