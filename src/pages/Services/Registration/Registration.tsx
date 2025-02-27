import { Alert, Button, Typography } from "@mui/material";
import Page from "../../../components/Page";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ILoginData } from "../../../types/user";
import TextFieldCustom from "../../../components/Forms/Inputs/TextFieldCustom";
import { useTranslation } from "react-i18next";
import { useRegistrationMutation } from "../../../services/token";
import { IResponseError } from "../../../types/common";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router";
import { AuthBox, AuthContainer } from "../Login/Login";
import { validateRegisterForm } from "../../../utils/validator/auth";
import { useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getResponseCompare } from "../../../utils/compare";

const Registration = () => {
  const { t } = useTranslation(["users", "service"]);
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const formMethods = useForm<ILoginData>();
  const { handleSubmit, setError } = formMethods;
  const [register, { isLoading, error, isSuccess }] = useRegistrationMutation();

  const handleLogin = () => navigate("/login");

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    const isValid = validateRegisterForm({ ...data, setError });
    if (isValid) {
      register(data);
    }
  };

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isAuthenticated) navigate(-1);
  }, [isAuthenticated, navigate]);

  return (
    <Page>
      <FormProvider {...formMethods}>
        <AuthContainer>
          <AuthBox spacing={3} direction="column">
            <Typography textAlign={"center"} fontSize={"1.5rem"}>
              {t("I18N_USER_SIGNUP")}
            </Typography>
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
                {getResponseCompare((error as IResponseError).data.message)}
              </Alert>
            )}
            <Button
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              variant="contained"
            >
              {t("I18N_SIGNUP_BUTTON")}
            </Button>
            <Button onClick={handleLogin} variant="text">
              {t("I18N_LOGIN")}
            </Button>
          </AuthBox>
        </AuthContainer>
      </FormProvider>
    </Page>
  );
};

export default Registration;
