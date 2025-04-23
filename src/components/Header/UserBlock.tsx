import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogoutMutation } from "../../services/token";
import useUserData from "../../hooks/useUserData";
import { useTranslation } from "react-i18next";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router";
import { getUserFullNameOrEmail } from "../../utils/user";
import LanguageSwitcher from "../LanguageSwitcher";
import CustomTitle from "../common/CustomTitle";
import { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";

const iconStyle = { color: "white", width: "25px", height: "25px" };

const UserBlock = ({ isMobile }: { isMobile: boolean }) => {
  const [logout] = useLogoutMutation();
  const { t } = useTranslation("users");
  const navigate = useNavigate();
  const handleLogout = () => logout();
  const handleLoginNavigate = () => navigate("/login");
  const { isAuthenticated, data } = useUserData();

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"asdfgh"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </>
    );
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {data && isAuthenticated && (
        <CustomTitle
          link="/account"
          text={t("I18N_USER_HELLO", { name: getUserFullNameOrEmail(data) })}
        />
      )}
      <LanguageSwitcher />
      {isAuthenticated && (
        <Tooltip title={t("I18N_USER_LOGOUT")}>
          <IconButton aria-label="singout" onClick={handleLogout}>
            <LogoutIcon style={iconStyle} />
          </IconButton>
        </Tooltip>
      )}
      {!isAuthenticated && (
        <Tooltip title={t("I18N_USER_LOGIN")}>
          <IconButton aria-label="singin" onClick={handleLoginNavigate}>
            <LoginIcon style={iconStyle} />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

export default UserBlock;
