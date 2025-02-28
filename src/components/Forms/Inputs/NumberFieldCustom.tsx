import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface INumberFieldCustomProps {
  name: string;
  label: string;
  autoFocus?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
}

const NumberFieldCustom: React.FC<INumberFieldCustomProps> = ({
  name,
  label,
  required = false,
  autoFocus = false,
  min,
  max,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation("components");

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: required,
          message: t("I18N_REQUIRED_FIELD"),
        },
        validate: (value) => parseFloat(value) > 0 || "invalidText",
      }}
      render={({ field }) => (
        <TextField
          {...field}
          autoFocus={autoFocus}
          label={label}
          required={required}
          type={"number"}
          fullWidth
          inputMode="numeric"
          error={Boolean(errors[name])}
          helperText={errors?.[name]?.message?.toString()}
          inputProps={{ min: min, max: max }}
        />
      )}
    />
  );
};

export default NumberFieldCustom;
