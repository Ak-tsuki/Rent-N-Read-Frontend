import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./DashboardAdmin.scss";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

function DashboardAdmin(props) {
  const { windows } = props;

  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [userDetails, setUserDetails] = useState("");
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:90/user/getadmin", config)
      .then((res) => {
        setUserDetails(res.data.data);
        console.log(userDetails.username);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const drawer = (
    <div className="alata" data-test="admin dashboard">
      <div className="admin-dashboard__logo">
        <img src={logo} alt="logo" />
      </div>
      <Divider />
      <List>
        <Link to="/dashboard_admin" className="admin-dashboard__nav">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={"Dashboard"}
                sx={{
                  fontFamily: "Alata",
                  fontSize: "20px",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      {/* <Divider /> */}
      <p className="admin-dashboard__nav--heading">Management</p>
      <List>
        <Link className="admin-dashboard__nav">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={"Users"}
                sx={{
                  fontFamily: "Alata",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to="/dashboard_admin/admin_approve"
          className="admin-dashboard__nav"
          data-test="admin_approve_btn"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={"Books"}
                sx={{
                  fontFamily: "Alata",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <p className="admin-dashboard__nav--heading">Book uploads</p>
        <Link className="admin-dashboard__nav">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PictureAsPdfIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={"E-Books"}
                sx={{
                  fontFamily: "Alata",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/dashboard_admin/audio_book" className="admin-dashboard__nav">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PlayLessonIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={"Audio Books"}
                sx={{
                  fontFamily: "Alata",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <Divider />
      <List>
        <Link className="admin-dashboard__nav">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={"Inbox"}
                sx={{
                  fontFamily: "Alata",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={"Logout"}
              sx={{
                fontFamily: "Alata",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    windows !== undefined ? () => windows().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: " 0px 2px 6px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="alata"
            flexGrow={1}
          ></Typography>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt="profile image"
                src={
                  userDetails.profile_pic
                    ? userDetails.profile_pic
                    : "https://www.pngitem.com/pimgs/m/421-4212341_default-avatar-svg-hd-png-download.png"
                }
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

DashboardAdmin.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  windows: PropTypes.func,
};

export default DashboardAdmin;
