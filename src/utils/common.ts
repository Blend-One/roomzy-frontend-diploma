export function getPriceCurrency(price: number): string {
  return new Intl.NumberFormat("ru-KZ", {
    currency: "KZT",
  })
    .format(price)
    .replace(/\s/g, ".");
}
