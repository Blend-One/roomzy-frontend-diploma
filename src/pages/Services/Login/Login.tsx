import { Alert, Button, Stack, styled, Typography } from "@mui/material";
import Page from "../../../components/Page";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ILoginData } from "../../../types/user";
import TextFieldCustom from "../../../components/Forms/Inputs/TextFieldCustom";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "../../../services/token";
import { IResponseError } from "../../../types/common";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { isLoginFormValid } from "../../../utils/validator/auth";

export const AuthContainer = styled(Stack)(() => ({
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
}));

export const AuthBox = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: 400,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
}));

const Login = () => {
  const { t } = useTranslation("users");
  const navigate = useNavigate();
  const formMethods = useForm<ILoginData>();
  const { handleSubmit, setError } = formMethods;

  const handleRegister = () => navigate("/registration");

  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    const isValid = isLoginFormValid({ ...data, setError });
    if (isValid) {
      login(data);
    }
  };

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  return (
    <Page>
      <FormProvider {...formMethods}>
        <AuthContainer>
          <AuthBox spacing={3} direction="column">
            <Stack spacing={1}>
              <Typography textAlign={"center"} fontSize={"1.5rem"}>
                {t("I18N_USER_LOGIN")}
              </Typography>
              <Typography textAlign={"center"} fontSize={"0.875rem"}>
                {t("I18N_USER_LOGIN_INFO")}
              </Typography>
            </Stack>
            <TextFieldCustom
              name={"email"}
              label={t("I18N_USER_EMAIL")}
              required
              autoFocus
            />
            <TextFieldCustom
              name={"password"}
              label={t("I18N_USER_PASSWORD")}
              type={"password"}
              required
            />
            {error && (
              <Alert
                icon={<ErrorOutlineIcon fontSize="inherit" />}
                severity="error"
              >
                {(error as IResponseError).data.message}
              </Alert>
            )}
            <Button
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              variant="contained"
            >
              {t("I18N_LOGIN")}
            </Button>
            <Button onClick={handleRegister} variant="text">
              {t("I18N_USER_SIGNUP")}
            </Button>
          </AuthBox>
        </AuthContainer>
      </FormProvider>
    </Page>
  );
};

export default Login;
