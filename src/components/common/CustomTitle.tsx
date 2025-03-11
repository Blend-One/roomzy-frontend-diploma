import { styled, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";

interface ICustomTitleProps {
  text: string;
  link?: string;
}

const StyledTypography = styled(Typography)<Partial<ICustomTitleProps>>(
  ({ link }) => ({
    color: "white",
    ...(link && {
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
        textUnderlineOffset: "0.3em",
      },
    }),
  })
);

const CustomTitle: FC<ICustomTitleProps> = ({ text, link }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (link) navigate(link);
  };

  return (
    <StyledTypography variant="h6" link={link} onClick={handleClick}>
      {text}
    </StyledTypography>
  );
};
export default CustomTitle;
