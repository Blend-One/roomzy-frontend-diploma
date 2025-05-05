import { Stack } from "@mui/material";
import DateFieldCustom from "./DateFieldCustom";
import { useWatch } from "react-hook-form";
import { useRef } from "react";

const TimeRangeCustom: React.FC = () => {
  const dateFrom = useWatch({ name: "dateFrom" });
  const dateTo = useWatch({ name: "dateTo" });

  const toPickerRef = useRef<{ focus: () => void } | null>(null);
  const fromPickerRef = useRef<{ focus: () => void } | null>(null);

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        border: "1px solid #E0E0E0",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <DateFieldCustom
        required
        name="dateFrom"
        label="Дата заезда"
        maxDate={dateTo || undefined}
        onOpen={() => toPickerRef.current?.focus()}
      />
      <Stack direction="row" spacing={1} alignItems="center">
        {String.fromCharCode(8211)}
      </Stack>
      <DateFieldCustom
        required
        name="dateTo"
        label="Дата выезда"
        minDate={dateFrom || undefined}
        onOpen={() => fromPickerRef.current?.focus()}
      />
    </Stack>
  );
};

export default TimeRangeCustom;
