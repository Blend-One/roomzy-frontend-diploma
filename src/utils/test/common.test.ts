import { EPaymentType } from "../../types/rooms";
import { getPriceCurrency, getPriceUnit } from "../common";

describe("getPriceCurrency", () => {
  it("formats integer price correctly", () => {
    expect(getPriceCurrency(1000)).toBe("1.000 ₸");
    expect(getPriceCurrency(50000)).toBe("50.000 ₸");
  });

  it("formats price with decimals correctly", () => {
    expect(getPriceCurrency(1234.56)).toBe("1.234,56 ₸");
  });

  it("formats zero price correctly", () => {
    expect(getPriceCurrency(0)).toBe("0 ₸");
  });

  it("formats large price correctly", () => {
    expect(getPriceCurrency(123456789)).toBe("123.456.789 ₸");
  });

  it("handles negative price", () => {
    expect(getPriceCurrency(-1000)).toBe("-1.000 ₸");
  });

  describe("getPriceCurrency", () => {
    it("formats integer price correctly", () => {
      expect(getPriceCurrency(1000)).toBe("1.000 ₸");
      expect(getPriceCurrency(50000)).toBe("50.000 ₸");
    });

    it("formats price with decimals correctly", () => {
      expect(getPriceCurrency(1234.56)).toBe("1.234,56 ₸");
    });

    it("formats zero price correctly", () => {
      expect(getPriceCurrency(0)).toBe("0 ₸");
    });

    it("formats large price correctly", () => {
      expect(getPriceCurrency(123456789)).toBe("123.456.789 ₸");
    });

    it("handles negative price", () => {
      expect(getPriceCurrency(-1000)).toBe("-1.000 ₸");
    });
  });

  describe("getPriceUnit", () => {
    it("returns correct singular forms", () => {
      expect(getPriceUnit("PER_DAY" as EPaymentType, 1)).toBe("день");
      expect(getPriceUnit("PER_MONTH" as EPaymentType, 1)).toBe("месяц");
      expect(getPriceUnit("PER_HOUR" as EPaymentType, 1)).toBe("час");
    });

    it("returns correct few forms", () => {
      expect(getPriceUnit("PER_DAY" as EPaymentType, 2)).toBe("дня");
      expect(getPriceUnit("PER_MONTH" as EPaymentType, 3)).toBe("месяца");
      expect(getPriceUnit("PER_HOUR" as EPaymentType, 4)).toBe("часа");
    });

    it("returns correct many forms", () => {
      expect(getPriceUnit("PER_DAY" as EPaymentType, 5)).toBe("дней");
      expect(getPriceUnit("PER_MONTH" as EPaymentType, 11)).toBe("месяцев");
      expect(getPriceUnit("PER_HOUR" as EPaymentType, 14)).toBe("часов");
      expect(getPriceUnit("PER_DAY" as EPaymentType, 22)).toBe("дня");
      expect(getPriceUnit("PER_MONTH" as EPaymentType, 25)).toBe("месяцев");
    });

    it("handles edge cases for pluralization", () => {
      expect(getPriceUnit("PER_DAY" as EPaymentType, 21)).toBe("день");
      expect(getPriceUnit("PER_DAY" as EPaymentType, 111)).toBe("дней");
      expect(getPriceUnit("PER_DAY" as EPaymentType, 112)).toBe("дней");
      expect(getPriceUnit("PER_DAY" as EPaymentType, 113)).toBe("дней");
      expect(getPriceUnit("PER_DAY" as EPaymentType, 114)).toBe("дней");
      expect(getPriceUnit("PER_DAY" as EPaymentType, 101)).toBe("день");
    });

    it("uses default case for unknown payment type", () => {
      expect(getPriceUnit("UNKNOWN" as EPaymentType, 1)).toBe("день");
      expect(getPriceUnit("UNKNOWN" as EPaymentType, 2)).toBe("дня");
      expect(getPriceUnit("UNKNOWN" as EPaymentType, 5)).toBe("дней");
    });
  });
});
