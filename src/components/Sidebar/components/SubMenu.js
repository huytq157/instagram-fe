// MUI
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Divider,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

// component

import Save from "../../../icons/Save";
import Setting from "../../../icons/Setting";
import DarkMode from "../../../icons/DarkMode";
import useLogout from "../../../hook/useLogout";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  position: "absolute",
  top: "-60px",
  left: "15px",
  "& .MuiPaper-root": {
    borderRadius: 10,
    marginTop: theme.spacing(1),
    minWidth: 260,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const SubMenu = ({ anchorEl, open, setAnchorEl }) => {
  const { handleLogout, isLoading } = useLogout();
  return (
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        "aria-labelledby": "demo-customized-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={() => setAnchorEl(null)}
    >
      <Box sx={{ padding: "8px" }}>
        <ListItemButton sx={{ borderRadius: "10px" }}>
          <ListItemIcon>
            <Setting />
          </ListItemIcon>
          <ListItemText primary="Cài đặt" />
        </ListItemButton>
        <ListItemButton sx={{ borderRadius: "10px" }}>
          <ListItemIcon>
            <Save />
          </ListItemIcon>
          <ListItemText primary="Đã lưu" />
        </ListItemButton>
        <ListItemButton sx={{ borderRadius: "10px" }}>
          <ListItemIcon>
            <DarkMode />
          </ListItemIcon>
          <ListItemText primary="Chuyển chế độ" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListItemButton
          sx={{ borderRadius: "10px" }}
          onClick={handleLogout}
          disabled={isLoading}
        >
          <ListItemText primary="Đăng xuất" />
        </ListItemButton>
      </Box>
    </StyledMenu>
  );
};

export default SubMenu;
