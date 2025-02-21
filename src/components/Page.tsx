import { styled, Stack } from "@mui/material";
import { PropsWithChildren } from "react";

const PageContainer = styled(Stack)(() => ({
  margin: 0,
  flexGrow: 1,
  flexShrink: 1,
}));

const Page = ({ children }: PropsWithChildren) => (
  <PageContainer>{children}</PageContainer>
);

export default Page;
