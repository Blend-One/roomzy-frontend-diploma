import NumberFieldCustom from "../Inputs/NumberFieldCustom";
import { Stack } from "@mui/material";

const SquareField = () => {
  return (
    <Stack direction={"row"} spacing={2}>
      <NumberFieldCustom label={"Площадь, от"} name={"squareFrom"} />
      <Stack justifyContent={"center"}>{String.fromCharCode(8212)}</Stack>
      <NumberFieldCustom label={"Площадь, до"} name={"squareTo"} />
    </Stack>
  );
};
export default SquareField;
