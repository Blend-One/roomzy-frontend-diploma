import { DigitalClock, LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
import { Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import "dayjs/locale/kk";
import i18n from "../../../i18n";

interface Props {
  name: string;
  label: string;
  required?: boolean;
  disablePast?: boolean;
}

const TimeFieldCustom: React.FC<Props> = ({
  name,
  label,
  required,
  disablePast,
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
            <DigitalClock
              disablePast={disablePast}
              timeStep={60}
              {...field}
              sx={{ width: "100%" }}
              onChange={(date) => {
                field.onChange(date);
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default TimeFieldCustom;
