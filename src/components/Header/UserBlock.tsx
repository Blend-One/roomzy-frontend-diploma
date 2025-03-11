import { IconButton, Stack, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogoutMutation } from "../../services/token";
import useUserData from "../../hooks/useUserData";
import { useTranslation } from "react-i18next";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router";
import { getUserFullNameOrEmail } from "../../utils/user";
import LanguageSwitcher from "../LanguageSwitcher";
import CustomTitle from "../common/CustomTitle";

const iconStyle = { color: "white", width: "25px", height: "25px" };

const UserBlock = () => {
  const [logout] = useLogoutMutation();
  const { t } = useTranslation("users");
  const navigate = useNavigate();
  const handleLogout = () => logout();
  const handleLoginNavigate = () => navigate("/login");
  const { isAuthenticated, data } = useUserData();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {data && isAuthenticated && (
        <CustomTitle
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
