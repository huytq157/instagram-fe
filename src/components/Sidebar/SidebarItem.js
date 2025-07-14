import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { ListItemIcon } from "@mui/material";

export const StyledNavItemIcon = styled(ListItemIcon)({
    width: 18,
    height: 18,
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  

const SidebarItem = ({ sidebar }) => {
  return (
    <Link to={sidebar.href}>
      <Stack direction="row">{sidebar.title}  </Stack>
      <StyledNavItemIcon>{sidebar.icons}</StyledNavItemIcon>
    </Link>
  );
};

export default SidebarItem;
