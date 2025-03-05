export interface ISpace {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  paymentType: EPaymentType;
  street: string;
  building: string;
  isCommercial: boolean;
  square: number;
  floor: number;
  hasDeposit: boolean;
}

export interface IRentalData extends ISpace {
  onMoreDetails: () => void;
}

export interface TSpacesSearchParams {
  rentType?: EPaymentType;
  priceFrom?: number;
  priceTo?: number;
}

export type EPaymentType = "DAY" | "MONTH" | "HOUR";
