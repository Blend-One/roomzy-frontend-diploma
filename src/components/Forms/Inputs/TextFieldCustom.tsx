import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ITextFieldCustomProps {
  name: string;
  label: string;
  autoFocus?: boolean;
  required?: boolean;
  multiline?: boolean;
  type?: React.InputHTMLAttributes<unknown>["type"];
}

const TextFieldCustom: React.FC<ITextFieldCustomProps> = ({
  name,
  label,
  required = false,
  autoFocus = false,
  multiline = false,
  type,
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
      defaultValue=""
      rules={{
        required: required ? (t("I18N_REQUIRED_FIELD") as string) : undefined,
      }}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          required={required}
          autoFocus={autoFocus}
          multiline={multiline}
          type={type}
          fullWidth
          error={Boolean(errors[name])}
          helperText={errors?.[name]?.message?.toString()}
        />
      )}
    />
  );
};

export default TextFieldCustom;
