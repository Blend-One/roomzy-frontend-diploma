import { t } from "i18next";
import { priceUnit, roomStatus, userAuth } from "../config/dictionaries";

export type TranslationMap = Record<string, string>;

function getCompare(map: TranslationMap, label: string): string {
  return t(map[label], { ns: "components" }) || label;
}

export function getResponseCompare(label: keyof typeof userAuth): string {
  return getCompare(userAuth, label);
}

export function getRentTypeCompare(label: keyof typeof priceUnit): string {
  return getCompare(priceUnit, label);
}

export function getRoomStatusCompare(label: keyof typeof roomStatus): string {
  return getCompare(roomStatus, label);
}
