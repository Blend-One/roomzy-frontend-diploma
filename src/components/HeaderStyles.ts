"use client";
import { styled, Stack, Typography } from "@mui/material";
import theme from "../theme";

export const Spacer = styled(Stack)(({}) => ({
  flexGrow: 1,
}));

export const Logo = styled(Typography)(({}) => ({
  fontSize: "2.5rem",
}));

export const hesader = {
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.primary.light,
  flexGrow: 1,
  padding: 16,
};
