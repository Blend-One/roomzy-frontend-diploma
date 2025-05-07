import { Stack } from "@mui/material";
import DateFieldCustom from "./DateFieldCustom";
import TimeFieldCustom from "./TimeFieldCustom";
import NumberFieldCustom from "./NumberFieldCustom";
import { useWatch } from "react-hook-form";
import { useEffect, useState } from "react";

const TimeRangeCustom: React.FC = () => {
  const [disablePast, setDisablePast] = useState(false);
  const dateFrom = useWatch({ name: "dateFrom" });

  useEffect(() => {
    if (dateFrom) {
      const currentDate = new Date();
      const selectedDate = new Date(dateFrom);
      setDisablePast(selectedDate.getTime() < currentDate.getTime());
    }
  }, [dateFrom]);

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
      <Stack flexGrow={1} direction="column" spacing={2} alignItems="center">
        <DateFieldCustom required name="dateFrom" label="Дата заезда" />
      </Stack>
      <Stack flexGrow={1} direction="column" spacing={2} alignItems="center">
        <TimeFieldCustom
          required
          disablePast={disablePast}
          name="timeFrom"
          label="Время заезда"
        />
        <NumberFieldCustom
          required
          name={"numberHours"}
          label={"Количество часов"}
        />
      </Stack>
    </Stack>
  );
};

export default TimeRangeCustom;
