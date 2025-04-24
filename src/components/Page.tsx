import { styled, Stack } from "@mui/material";
import { PropsWithChildren } from "react";

type TPageProps = {
  withPadding?: boolean;
};

const PageContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "withPadding",
})<{ withPadding?: boolean }>(({ theme, withPadding }) => ({
  margin: 0,
  flexGrow: 1,
  flexShrink: 1,
  overflowY: "auto",
  padding: withPadding ? "0 10%" : undefined,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2, 2),
  }
}));

const Page = ({ withPadding, children }: PropsWithChildren<TPageProps>) => (
  <PageContainer withPadding={withPadding}>{children}</PageContainer>
);

export default Page;
