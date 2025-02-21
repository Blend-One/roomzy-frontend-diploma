import { Button, Stack, styled, Typography } from "@mui/material";
import Page from "../../../components/Page";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ILoginData } from "../../../types/user";
import TextFieldCustom from "../../../components/Forms/Inputs/TextFieldCustom";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "../../../services/token";

const AuthContainer = styled(Stack)(() => ({
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
}));

const AuthBox = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: 400,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
}));

const Login = () => {
  const { t } = useTranslation("users");

  const formMethods = useForm<ILoginData>();
  const { handleSubmit } = formMethods;

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<ILoginData> = (data) => login(data);

  return (
    <Page>
      <FormProvider {...formMethods}>
        <AuthContainer>
          <AuthBox spacing={3} direction="column">
            <Typography textAlign={"center"} fontSize={"1.5rem"}>
              {t("I18N_USER_LOGIN")}
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
            <Button
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              variant="contained"
            >
              {t("I18N_LOGIN")}
            </Button>
          </AuthBox>
        </AuthContainer>
      </FormProvider>
    </Page>
  );
};

export default Login;
