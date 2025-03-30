export interface ISectionTypes {
  id: string;
  name: string;
  attributes: CharacteristicElement[];
}

export interface CharacteristicElement {
  id: string;
  name: string;
  characteristic: CharacteristicCharacteristic;
}

export interface CharacteristicCharacteristic {
  id: string;
  name: string;
}

export interface ICreateSections {
  floorNumber: number;
  sectionTypes: SectionType[];
}

export interface SectionType {
  sectionId: string;
  sectionData: SectionData[];
}

export interface SectionData {
  characteristicId: string;
  attributeId: string;
}
