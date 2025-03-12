import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router";

const BasicBreadcrumbs: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit"  onClick={handleClick}>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="textPrimary" key={to}>
            {value}
          </Typography>
        ) : (
          <Link color="inherit" onClick={() => navigate(to)} key={to}>
            {value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BasicBreadcrumbs;
