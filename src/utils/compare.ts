import { t } from "i18next";
import { paymentType, userAuth } from "../config/dictionaries";

export type TranslationMap = Record<string, string>;

function getCompare(map: TranslationMap, label: string): string {
  return t(map[label], { ns: "components" }) || label;
}

export function getResponseCompare(label: keyof typeof userAuth): string {
  return getCompare(userAuth, label);
}

export function getRentTypeCompare(label: keyof typeof paymentType): string {
  return getCompare(paymentType, label);
}
