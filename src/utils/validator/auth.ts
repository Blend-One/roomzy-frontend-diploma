import { UseFormSetError } from "react-hook-form";
import { IRegistrationData } from "../../types/user";
import validator from "validator";
import { t } from "i18next";

interface IValidateRegisterFormProps extends IRegistrationData {
  setError: UseFormSetError<IRegistrationData>;
}

export const validateRegisterForm = ({
  email,
  password,
  setError,
}: IValidateRegisterFormProps): boolean => {
  let isValid = true;

  if (!validator.isEmail(email)) {
    setError("email", {
      type: "manual",
      message: t("I18N_USER_EMAIL_INVALID", { ns: "components" }),
    });
    isValid = false;
  }
  if (!validator.isLength(password, { min: 8 })) {
    setError("password", {
      type: "manual",
      message: t("I18N_USER_PASSWORD_SHORT", { ns: "components" }),
    });
    isValid = false;
  }
  if (!validator.isLength(password, { max: 64 })) {
    setError("password", {
      type: "manual",
      message: t("I18N_USER_PASSWORD_LONG", { ns: "components" }),
    });
    isValid = false;
  }

  return isValid;
};

export const isLoginFormValid = ({
    email,
    password,
    setError,
  }: IValidateRegisterFormProps): boolean => {
    let isValid = true;
  
    if (!validator.isEmail(email)) {
      setError("email", {
        type: "manual",
        message: t("I18N_USER_EMAIL_INVALID", { ns: "components" }),
      });
      isValid = false;
    }
    if (!validator.isLength(password, { min: 8 })) {
      setError("password", {
        type: "manual",
        message: t("I18N_USER_PASSWORD_SHORT", { ns: "components" }),
      });
      isValid = false;
    }
    if (!validator.isLength(password, { max: 64 })) {
      setError("password", {
        type: "manual",
        message: t("I18N_USER_PASSWORD_LONG", { ns: "components" }),
      });
      isValid = false;
    }
  
    return isValid;
  };
