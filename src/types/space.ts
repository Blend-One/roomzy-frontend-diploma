export interface ISpace {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  priceUnit: EPaymentType;
  street: string;
  building: string;
  isCommercial: boolean;
  square: number;
  floors: number;
  hasDeposit: boolean;
}

export interface IRentalData extends ISpace {
  onMoreDetails: () => void;
}

export interface TSpacesSearchParams {
  priceUnit?: EPaymentType;
  priceFrom?: number;
  priceTo?: number;
}

export type EPaymentType = "PER_DAY" | "PER_MONTH" | "PER_HOUR";
