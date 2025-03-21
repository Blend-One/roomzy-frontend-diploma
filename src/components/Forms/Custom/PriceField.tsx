import NumberFieldCustom from "../Inputs/NumberFieldCustom";
import { Stack } from "@mui/material";

const PriceField = () => {
  return (
    <Stack direction={"row"} spacing={2}>
      <NumberFieldCustom label={"Цена, от"} name={"priceFrom"} />
      <Stack justifyContent={"center"}>{String.fromCharCode(8212)}</Stack>
      <NumberFieldCustom label={"Цена, до"} name={"priceTo"} />
    </Stack>
  );
};
export default PriceField;
