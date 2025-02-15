"use client";
import { Stack } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { hesader, Logo, Spacer } from "./HeaderStyles";
import { useState } from "react";
import { setLanguageValue } from "@/actions/set-language-action";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  document.documentElement.lang = selectedLanguage;

  // Function to handle language change
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
        <option value="ru">Russian</option>
      </select>
      <Stack direction="row" spacing={2} alignItems="center">
        <AccountCircleIcon fontSize="large" />
        <NotificationsIcon fontSize="large" />
      </Stack>
    </Stack>
  );
};

export default Header;
