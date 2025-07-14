import { useContext, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// MUI
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

// component
import Home from "../../icons/Home";
import Explore from "../../icons/Explore";
import Message from "../../icons/Message";
import Search from "../../icons/Search";
import Create from "../../icons/Create";
import Notification from "../../icons/Notification";
import Logo from "../../icons/Logo";
import Menus from "../../icons/Menu";

import { AuthContext } from "../../context/AuthContext";
import { notificationKey } from "../../utils/react-query-key";
import { getNotification } from "../../services/notifications";
import BoxNotification from "./components/BoxNotification";
import SubMenu from "./components/SubMenu";
import SearchModal from "./components/SearchModal";
import { CreatePostModalContext } from "../../context/CreatePostModalContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const { setIsOpen } = useContext(CreatePostModalContext);
  const [openNotification, setOpenNotification] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { data } = useQuery(
    [notificationKey.GET_NOTIFICATION],
    getNotification
  );

  const countNotification = useMemo(() => {
    return data?.notifications?.filter((notification) => !notification.read)
      ?.length;
  }, [data?.notifications?.length]);

  return (
    <Box>
      <ListItemButton
        component={Link}
        to="/"
        sx={{ borderRadius: "10px", mx: "10px", py: 3 }}
      >
        <ListItemIcon>
          <Logo />
        </ListItemIcon>
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/"
        sx={{
          borderRadius: "10px",
          mx: "10px",
          backgroundColor: pathname === "/" ? "#e0e0e0" : "inherit",
        }}
      >
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Trang chủ" />
      </ListItemButton>

      <ListItemButton
        sx={{ borderRadius: "10px", mx: "10px" }}
        onClick={() => setOpenSearch(true)}
      >
        <ListItemIcon>
          <Search />
        </ListItemIcon>
        <ListItemText primary="Tìm kiếm" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/explore"
        sx={{
          borderRadius: "10px",
          mx: "10px",
          backgroundColor: pathname === "/explore" ? "#e0e0e0" : "inherit",
        }}
      >
        <ListItemIcon>
          <Explore />
        </ListItemIcon>
        <ListItemText primary="Khám phá" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/messages"
        sx={{
          borderRadius: "10px",
          mx: "10px",
          backgroundColor: pathname === "/message " ? "#e0e0e0" : "inherit",
        }}
      >
        <ListItemIcon>
          <Badge color="error">
            <Message />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Tin nhắn" />
      </ListItemButton>

      <ListItemButton
        sx={{ borderRadius: "10px", mx: "10px" }}
        onClick={() => setOpenNotification(true)}
      >
        <ListItemIcon>
          <Badge badgeContent={countNotification} color="error">
            <Notification />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Thông báo" />
      </ListItemButton>

      <ListItemButton
        sx={{ borderRadius: "10px", mx: "10px" }}
        onClick={() => setIsOpen(true)}
      >
        <ListItemIcon>
          <Create />
        </ListItemIcon>
        <ListItemText primary="Tạo" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to={`/profile/${user?._id}`}
        sx={{ borderRadius: "10px", mx: "10px" }}
      >
        <ListItemIcon>
          <Avatar
            alt="Remy Sharp"
            src={user?.avatar}
            sx={{ width: 29, height: 29 }}
          />
        </ListItemIcon>
        <ListItemText primary="Trang cá nhân" />
      </ListItemButton>

      <ListItemButton
        sx={{
          borderRadius: "10px",
          mx: "10px",
          position: "absolute",
          bottom: 15,
          right: 0,
          left: 0,
        }}
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <ListItemIcon>
          <Menus />
        </ListItemIcon>
        <ListItemText primary="Xem thêm" />
      </ListItemButton>

      <BoxNotification
        notifications={data?.notifications}
        openNotification={openNotification}
        anchorEl={anchorEl}
        setOpenNotification={setOpenNotification}
      />
      <SubMenu anchorEl={anchorEl} open={open} setAnchorEl={setAnchorEl} />

      {openSearch && (
        <SearchModal openSearch={openSearch} setOpenSearch={setOpenSearch} />
      )}
    </Box>
  );
};

export default Sidebar;
