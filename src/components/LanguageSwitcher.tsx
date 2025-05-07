import LanguageIcon from "@mui/icons-material/Language";
import MenuItem from "@mui/material/MenuItem";
import i18n from "../i18n";
import { useState } from "react";
import {
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type Languages = "ru" | "en" | "kk";

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
    language: "kk",
    name: "Қазақша",
  },
  {
    language: "en",
    name: "English",
  },
];

const LanguageSwitcher = ({ nav }: { nav?: boolean }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation("users");

  const changeLanguage = (language: Languages) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {nav && (
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary={t("I18N_USER_LANGUAGE")} />
        </ListItemButton>
      )}
      {!nav && (
        <IconButton aria-label="language-change" onClick={handleClick}>
          <LanguageIcon
            sx={{ color: "white", width: "25px", height: "25px" }}
          />
        </IconButton>
      )}
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
            onClick={(event) => {
              event.stopPropagation();
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
