import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
import { Dayjs } from "dayjs";
import { Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import "dayjs/locale/kk";
import i18n from "../../../i18n";

interface Props {
  name: string;
  label: string;
  required?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  views?: Array<"day" | "month" | "year">;
  onOpen?: () => void;
}

const DateFieldCustom: React.FC<Props> = ({
  name,
  label,
  minDate,
  maxDate,
  required,
  views,
  onOpen,
}) => {
  const { control } = useFormContext();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={i18n.language ?? "ru"}
    >
      <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
        <Stack alignItems="center" fontWeight={500} id={name}>
          {label}
        </Stack>
        <Controller
          name={name}
          control={control}
          rules={{ required: !!required }}
          render={({ field }) => (
            <DateCalendar
              {...field}
              openTo={views?.[1]}
              views={views}
              minDate={minDate}
              maxDate={maxDate}
              disablePast
              disableHighlightToday
              sx={{ width: "100%" }}
              onChange={(date) => {
                field.onChange(date);
                onOpen?.();
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateFieldCustom;
