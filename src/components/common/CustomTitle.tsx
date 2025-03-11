import { Link, styled } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";

interface ICustomTitleProps {
  text: string;
  link?: string;
}

const StyledLink = styled(Link)<Partial<ICustomTitleProps>>(({ link }) => ({
  color: "white",
  textDecoration: "none",
  ...(link && {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
      textUnderlineOffset: "0.3em",
    },
  }),
}));

const CustomTitle: FC<ICustomTitleProps> = ({ text, link }) => {
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (link) navigate(link);
  };

  return (
    <StyledLink variant="h6" href={link} link={link} onClick={handleClick}>
      {text}
    </StyledLink>
  );
};

export default CustomTitle;
