type Input = {
  floorNumber: number;
  sectionTypes: {
    sectionId: string;
    sectionData: {
      characteristicId: string;
      attributeId: string;
    }[];
  }[];
}[];

type Output = {
  floorNumber: number;
  roomSectionTypeId: string;
  sectionAttributeValues: Record<string, string>;
}[];

export function getSections(input: Input): Output {
  const output: Output = [];

  for (const floor of input) {
    for (const section of floor.sectionTypes) {
      const sectionAttributeValues: Record<string, string> = {};

      for (const data of section.sectionData) {
        sectionAttributeValues[data.characteristicId] = data.attributeId;
      }

      output.push({
        floorNumber: floor.floorNumber,
        roomSectionTypeId: section.sectionId,
        sectionAttributeValues,
      });
    }
  }

  return output;
}
