"use client";
import { Stack, styled, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Spacer = styled(Stack)(({}) => ({
    flexGrow: 1,
}));

const Logo = styled(Typography)(({}) => ({
    fontSize: "2.5rem",
}));

const hesader = {
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
    padding: 16,
};

const Header = () => {
    return (
        <Stack component={"header"} style={hesader} direction="row" spacing={2}>
            <Logo variant="h1">Roomzy</Logo>
            <Spacer />
            <Stack direction="row" spacing={2} alignItems="center">
                <AccountCircleIcon fontSize="large"/>
                <NotificationsIcon fontSize="large"/>
            </Stack>
        </Stack>
    );
}

export default Header;