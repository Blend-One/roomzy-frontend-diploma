"use client";
import { Stack } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { hesader, Logo, Spacer } from "./HeaderStyles";
import { useState } from "react";
import { setLanguageValue } from "@/actions/setLanguageAction";
import { useLocale } from "next-intl";

const Header = () => {
  const locale = useLocale();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(locale ?? "ru");
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    setLanguageValue(e.target.value);
  };

  return (
    <Stack component={"header"} style={hesader} direction="row" spacing={2}>
      <Logo variant="h1">Roomzy</Logo>
      <Spacer />
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </select>
      <Stack direction="row" spacing={2} alignItems="center">
        <AccountCircleIcon fontSize="large" />
        <NotificationsIcon fontSize="large" />
      </Stack>
    </Stack>
  );
};

export default Header;
