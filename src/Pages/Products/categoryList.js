import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
export default function TemporaryDrawer() {
  const subcategory = useSelector((state) => state.subcategorydata.value);
  const categories = useSelector((state) => state.categories.value);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <h3>دیجیتال ارت</h3>
        {subcategory.map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={`/products/${index + 1}`}>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <h3>نقاشی</h3>
        {subcategory.map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={`/products/${index + 1}`}>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        <h3>عکس</h3>
        {subcategory.map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={`/products/${index + 1}`}>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        <h3>تایپوگرافی</h3>
        {subcategory.map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={`/products/${index + 1}`}>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Outlet/>

    </Box>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Button onClick={toggleDrawer("right", true)}>
          {"لیست گروه محصولات"}
        </Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
