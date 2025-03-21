import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type TSelectOption = { value: string; title: string };

export interface ISelectFieldCustomProps {
  name: string;
  options: TSelectOption[];
  label: string;
  required?: boolean;
  disabled?: boolean;
  withEmpty?: boolean;
}

const SelectFieldCustom: React.FC<ISelectFieldCustomProps> = ({
  name,
  options,
  label,
  required = false,
  disabled = false,
  withEmpty = false,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation("components");
  const { t: tLabel } = useTranslation("labels");

  const optionsToRender = useMemo(() => {
    return options.map((state) => ({
      ...state,
      title: tLabel(state.title),
    }));
  }, [options, tLabel]);

  return (
    <FormControl fullWidth error={Boolean(errors?.[name]?.message)}>
      <InputLabel id={name}>{required ? `${label} *` : label}</InputLabel>
      <Controller
        name={name}
        rules={{
          required: {
            value: required,
            message: t("I18N_REQUIRED_FIELD"),
          },
        }}
        render={({ field }) => (
          <Select
            {...field}
            labelId="address-city-selector-label"
            label={label}
            disabled={disabled || !optionsToRender}
          >
            {withEmpty && (
              <MenuItem value="">
                <em>{t("I18N_SELECT_NONE")}</em>
              </MenuItem>
            )}
            {optionsToRender.map((option: TSelectOption) => (
              <MenuItem key={option.value} value={option.value}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {Boolean(errors?.[name]?.message) && (
        <FormHelperText>{errors?.[name]?.message?.toString()}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectFieldCustom;
