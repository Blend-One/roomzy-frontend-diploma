import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const BasicBreadcrumbs: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation("nav");
  const pathnames = location.pathname.split("/").filter((x) => x);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" sx={{ cursor: "pointer" }} onClick={handleClick}>
        {t("I18N_NAV_HOME")}
      </Link>

      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="textPrimary" sx={{ cursor: "default" }} key={to}>
            {t(`I18N_NAV_${value.toUpperCase()}`, value)}
          </Typography>
        ) : (
          <Link
            color="inherit"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(to)}
            key={to}
          >
            {t(`I18N_NAV_${value.toUpperCase()}`, value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BasicBreadcrumbs;
