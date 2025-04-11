import { CircularProgress, Stack, styled } from "@mui/material";

const LoaderContianer = styled(Stack)({
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
});

const Loader = () => {
  return (
    <LoaderContianer>
      <CircularProgress size={100} />
    </LoaderContianer>
  );
};
export default Loader;
