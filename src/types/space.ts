import { IDictionary } from "./dictionaries";

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
  floors: number;
  hasDeposit: boolean;
}

export interface IViewSpace {
  id: string;
  images: string[];
  title: string;
  price: number;
  paymentType: EPaymentType;
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
  rentType?: EPaymentType;
  priceFrom?: number;
  priceTo?: number;
}

export interface ISpaceDetails {
  floor: number;
  data: ISpaceFloorDetails[];
}

export interface ISpaceFloorDetails {
  name: string;
  details: IDictionary[];
}

export type EPaymentType = "DAY" | "MONTH" | "HOUR";
