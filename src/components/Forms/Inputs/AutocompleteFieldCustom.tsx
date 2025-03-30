import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type TSelectOption = { value: string; label: string };

export interface IAutocompleteFieldCustomProps {
  name: string;
  options: TSelectOption[];
  label: string;
  required?: boolean;
  disabled?: boolean;
}

const AutocompleteFieldCustom: React.FC<IAutocompleteFieldCustomProps> = ({
  name,
  options,
  label,
  required = false,
  disabled = false,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation("components");
  const { t: tLabel } = useTranslation("labels");

  const optionsToRender = useMemo(() => {
    return options.map((state) => ({
      ...state,
      label: tLabel(state.label),
    }));
  }, [options, tLabel]);

  return (
    <FormControl fullWidth error={Boolean(errors?.[name]?.message)}>
      {/* <InputLabel id={name}>{required ? `${label} *` : label}</InputLabel> */}
      <Controller
        name={name}
        rules={{
          required: {
            value: required,
            message: t("I18N_REQUIRED_FIELD"),
          },
        }}
        render={({ field }) => (
          <Autocomplete
            disabled={disabled}
            disablePortal
            getOptionLabel={(option) => option.label || ""}
            value={field.value}
            onChange={(_event, value) => field.onChange(value)}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            options={optionsToRender}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label={required ? `${label} *` : label} />
            )}
          />
        )}
      />
      {Boolean(errors?.[name]?.message) && (
        <FormHelperText>{errors?.[name]?.message?.toString()}</FormHelperText>
      )}
    </FormControl>
  );
};

export default AutocompleteFieldCustom;
