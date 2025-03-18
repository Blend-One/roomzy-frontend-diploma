import { IDictionary } from "./dictionaries";
import { IBaseSearchParams } from "./pagination";

export interface TRoomsSearchParams extends IBaseSearchParams {
  priceUnit?: EPaymentType;
  priceFrom?: number;
  priceTo?: number;
}

export interface IRoomsDetails {
  floor: number;
  data: ISpaceFloorDetails[];
}

export interface ISpaceFloorDetails {
  name: string;
  details: IDictionary[];
}

export type EPaymentType = "PER_DAY" | "PER_MONTH" | "PER_HOUR";

export interface IRoom {
  title: string;
  price: string;
  priceUnit: string;
  physControlInstructions: string | null;
  accessInstructions: string | null;
  street: string;
  building: number;
  appartment: string;
  isCommercial: boolean;
  hasDeposit: boolean;
  square: number;
  lat: string;
  lon: string;
  id: string;
  roomTypeId: string;
  cityId: string;
  districtId: string;
  userId: string;
  status: string;
  physControl: boolean;
  roomType: City;
  roomImages: RoomImage[];
  district: City;
  city: City;
  files: string[];
  sections: RoomSection[];
}

export interface City {
  id: string;
  name: string;
}

export interface RoomImage {
  id: string;
  roomId: string;
  hash: null;
  name: string;
}

export interface RoomSection {
  floorNumber: number;
  id: string;
  roomSectionType: City;
  sectionAttributeValues: SectionAttributeValue[];
}

export interface SectionAttributeValue {
  id: string;
  characteristic: City;
  attribute: City;
}
