export interface IRoomTypes {
  id: string;
  name: string;
  sectionTypes: SectionType[];
}

export interface SectionType {
  id: string;
  name: string;
}

export interface ICreateRoomTypes {
  fallbackName: string;
  ru: string;
  kz: string;
  sectionIds: string[];
}
