import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogoutMutation } from "../../services/token";
import useUserData from "../../hooks/useUserData";
import { useTranslation } from "react-i18next";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router";
import { getUserFullNameOrEmail } from "../../utils/user";

const iconStyle = { color: "white", width: "30px", height: "30px" };

const UserBlock = () => {
  const [logout] = useLogoutMutation();
  const { t } = useTranslation("users");
  const navigate = useNavigate();
  const handleLogout = () => logout(undefined);
  const handleLoginNavigate = () => navigate("/login");
  const { isAuthenticated, data } = useUserData();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {isAuthenticated && (
        <>
          <Typography variant="h6" style={{ color: "white" }}>
            {t("I18N_USER_HELLO", { name: getUserFullNameOrEmail(data!) })}
          </Typography>
          <Tooltip title={t("I18N_USER_LOGOUT")}>
            <IconButton aria-label="singout" onClick={handleLogout}>
              <LogoutIcon style={iconStyle} />
            </IconButton>
          </Tooltip>
        </>
      )}
      {!isAuthenticated && (
        <Tooltip title={t("I18N_USER_LOGIN")}>
          <IconButton aria-label="singout" onClick={handleLoginNavigate}>
            <LoginIcon style={iconStyle} />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

export default UserBlock;
