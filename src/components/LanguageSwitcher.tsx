import LanguageIcon from "@mui/icons-material/Language";
import MenuItem from "@mui/material/MenuItem";
import i18n from "../i18n";
import { useState } from "react";
import { IconButton, Menu } from "@mui/material";

type Languages = "ru" | "en" | "kz";

interface ILanguages {
  language: Languages;
  name: string;
}

const languages: Array<ILanguages> = [
  {
    language: "ru",
    name: "Русский",
  },
  {
    language: "kz",
    name: "Қазақша",
  },
  {
    language: "en",
    name: "English",
  },
];

const LanguageSwitcher = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const changeLanguage = (language: Languages) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label="language-change" onClick={handleClick}>
        <LanguageIcon sx={{ color: "white", width: "25px", height: "25px" }} />
      </IconButton>
      <Menu
        id="language-switcher-menu"
        aria-labelledby="language-switcher-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {languages.map((language, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              changeLanguage(language.language);
            }}
          >
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
