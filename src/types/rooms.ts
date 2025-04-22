import { ERoomStatus } from "../config/room";
import { IDictionary } from "./dictionaries";
import { IBaseSearchParams } from "./pagination";
import { ICreateSections } from "./sectionTypes";

export interface TRoomsSearchParams extends IBaseSearchParams {
  priceUnit?: EPaymentType;
  cityId?: string;
  districtIds?: string;
  isCommercial?: string;
  physControl?: string;
  square?: string;
  priceRange?: string;
  title?: string;
  roomTypeId?: string;
  hasDeposit?: string;
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

export interface ICreateRoom {
  title: string;
  price: string;
  priceUnit: string;
  physControlInstructions: string | null;
  accessInstructions: string | null;
  street: string;
  building: string;
  appartment: string;
  isCommercial: boolean;
  hasDeposit: boolean;
  square: number;
  lat: number;
  lon: number;
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
  files: File;
  sections: ICreateSections[];
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
  roomSectionType: string;
  sectionAttributeValues: SectionAttributeValue[];
}

export interface SectionAttributeValue {
  id: string;
  characteristic: City;
  attribute: City;
}

export interface IViewRoom {
  id: string;
  title: string;
  userId: string;
  status: string;
  price: string;
  priceUnit: string;
  physControl: boolean;
  physControlInstructions: string;
  accessInstructions: string;
  street: string;
  building: string;
  appartment: string;
  isCommercial: boolean;
  hasDeposit: boolean;
  square: number;
  lat: number;
  lon: number;
  roomType: City;
  roomSections: RoomViewSection[];
  roomImages: RoomImage[];
  district: City;
  city: City;
}

export interface IUpdateRoomStatus {
  roomId: string;
  status: ERoomStatus;
}

export interface RoomViewSection {
  floorNumber: number;
  id: string;
  roomSectionType: City;
  sectionAttributeValues: SectionViewAttributeValue[];
}

export interface SectionViewAttributeValue {
  id: string;
  characteristic: City;
  attribute: City;
}
