import { styled, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import cn from "classnames";

const PageContainer = styled(Stack)(() => ({
  margin: 0,
  flexGrow: 1,
  flexShrink: 1,
  overflowY: "auto",
  maxHeight: "100vh",

  "&.withPadding": {
    padding: "0 10%",
  },
}));

type TPageProps = {
  withPadding?: boolean | string;
};

const Page = ({ withPadding, children }: PropsWithChildren<TPageProps>) => (
  <PageContainer className={cn({ withPadding })}>{children}</PageContainer>
);

export default Page;
