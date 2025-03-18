import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface ISwitchFieldCustomProps {
  name: string;
  label: string;
  autoFocus?: boolean;
  required?: boolean;
}

const SwitchFieldCustom: React.FC<ISwitchFieldCustomProps> = ({
  name,
  label,
  required = false,
  autoFocus = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl component="fieldset" variant="standard">
          <FormControlLabel
            control={
              <Switch
                checked={value}
                onChange={onChange}
                required={required}
                autoFocus={autoFocus}
              />
            }
            label={label}
          />
          {Boolean(errors?.[name]?.message) && (
            <FormHelperText>
              {errors?.[name]?.message?.toString()}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default SwitchFieldCustom;
