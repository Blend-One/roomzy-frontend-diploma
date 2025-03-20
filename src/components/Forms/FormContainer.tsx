import { PropsWithChildren, ReactNode } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";

type FormSectionProps = {
  onSubmit: SubmitHandler<any>;
  isLoading: boolean;
  formId: string;
  btnText?: string;
  btnDisabled?: boolean;
  actionSlot?: ReactNode;
  color?:
    | "success"
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "warning";
  variant?: "text" | "outlined" | "contained";
};

const FormContainer = ({
  isLoading,
  formId,
  onSubmit,
  children,
  btnText = "I18N_ADD_CREATE",
  btnDisabled = false,
  color = "success",
  variant = "contained",
  actionSlot,
}: PropsWithChildren<FormSectionProps>) => {
  const { t } = useTranslation("forms");
  const { handleSubmit } = useFormContext();
  const navigate = useNavigate();
  return (
    <>
      <Stack sx={{ overflowY: "auto" }} pt={3} spacing={3} flexGrow={1}>
        {children}
      </Stack>
      <Stack sx={{ pb: 3 }} spacing={2} direction="row">
        <Button
          type="submit"
          form={formId}
          disabled={btnDisabled}
          variant={variant}
          color={color}
          size="large"
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {t(btnText)}
        </Button>
        {actionSlot && actionSlot}
        <Button variant="outlined" onClick={() => navigate(-1)} size="large">
          {t("I18N_CANCEL")}
        </Button>
      </Stack>
    </>
  );
};

export default FormContainer;
