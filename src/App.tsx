import { Outlet } from "react-router";
import Header from "./components/Header";
import { Stack, styled } from "@mui/material";

export const Container = styled(Stack)({
  margin: 0,
  flexGrow: 1,
  flexShrink: 1,
  height: "100vh",
});

const App = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};

export default App;
