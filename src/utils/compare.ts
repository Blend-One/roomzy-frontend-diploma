import { t } from "i18next";

type TranslationMap = Record<string, string>;

const translations: TranslationMap = {
  PASSWORDS_ARE_NOT_EQUAL: "I18N_PASSWORDS_ARE_NOT_EQUAL",
  USER_NOT_FOUND: "I18N_USER_NOT_FOUND",
  USER_ALREADY_EXISTS: "I18N_USER_ALREADY_EXISTS",
  UNAUTHORIZED: "I18N_UNAUTHORIZED",
  INVALID_EMAIL: "I18N_INVALID_EMAIL",
  INVALID_PASSWORD: "I18N_INVALID_PASSWORD",
};

function getCompare(map: TranslationMap, label: string): string {
  return t(map[label], { ns: "service" }) || label;
}

export function getResponseCompare(label: keyof typeof translations): string {
  return getCompare(translations, label);
}
