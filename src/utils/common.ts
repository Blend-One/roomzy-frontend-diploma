import { EPaymentType } from "../types/rooms";

export function getPriceCurrency(price: number): string {
  return (
    new Intl.NumberFormat("ru-KZ", {
      currency: "KZT",
    })
      .format(price)
      .replace(/\s/g, ".") + " ₸"
  );
}

export function getPriceUnit(title: EPaymentType, count: number): string {
  const getPluralForm = (count: number, forms: [string, string, string]) => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod100 >= 11 && mod100 <= 14) {
      return forms[2];
    }
    if (mod10 === 1) {
      return forms[0];
    }
    if (mod10 >= 2 && mod10 <= 4) {
      return forms[1];
    }
    return forms[2];
  };

  switch (title) {
    case "PER_DAY":
      return getPluralForm(count, ["день", "дня", "дней"]);
    case "PER_MONTH":
      return getPluralForm(count, ["месяц", "месяца", "месяцев"]);
    case "PER_HOUR":
      return getPluralForm(count, ["час", "часа", "часов"]);
    default:
      return getPluralForm(count, ["день", "дня", "дней"]);
  }
}
