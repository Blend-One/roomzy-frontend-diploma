import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountIcon from "@mui/icons-material/AccountCircle";
import PublicationsIcon from "@mui/icons-material/Description";
import RentalsIcon from "@mui/icons-material/LocalOffer";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const AccountMenu = () => {
  const { t } = useTranslation("nav");
  const navigate = useNavigate();
  return (
    <Paper>
      <MenuList>
        <MenuItem onClick={() => navigate("/account")}>
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <ListItemText>{t("I18N_NAV_ACCOUNT")}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate("/account/rentals")}>
          <ListItemIcon>
            <RentalsIcon />
          </ListItemIcon>
          <ListItemText>{t("I18N_NAV_RENTALS")}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate("/account/publications")}>
          <ListItemIcon>
            <PublicationsIcon />
          </ListItemIcon>
          <ListItemText>{t("I18N_NAV_PUBLICATIONS")}</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default AccountMenu;
