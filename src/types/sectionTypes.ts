export interface ISectionTypes {
  id: string;
  name: string;
  characteristics: CharacteristicElement[];
}

export interface CharacteristicElement {
  id: string;
  characteristic: CharacteristicCharacteristic;
}

export interface CharacteristicCharacteristic {
  id: string;
  name: string;
}
