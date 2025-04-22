type InputItem = {
  floorNumber: number;
  id: string;
  roomSectionType: {
    id: string;
    name: string;
  };
  sectionAttributeValues: {
    id: string;
    characteristic: {
      id: string;
      name: string;
    };
    attribute: {
      id: string;
      name: string;
    };
  }[];
};

export type OutputSectionsView = {
  floorNumber: number;
  sectionTypes: {
    sectionId: string;
    sectionName: string;
    sectionData: {
      characteristicId: string;
      attributeId: string;
    }[];
  }[];
};

export function getSections(data: InputItem[]): OutputSectionsView[] {
  const floorsMap = new Map<
    number,
    Map<
      string,
      {
        sectionId: string;
        sectionName: string;
        sectionData: { characteristicId: string; attributeId: string }[];
      }
    >
  >();

  for (const item of data) {
    const floorNumber = item.floorNumber;
    const sectionId = item.roomSectionType.id;
    const sectionName = item.roomSectionType.name;

    if (!floorsMap.has(floorNumber)) {
      floorsMap.set(floorNumber, new Map());
    }

    const sectionMap = floorsMap.get(floorNumber)!;

    if (!sectionMap.has(sectionId)) {
      sectionMap.set(sectionId, {
        sectionId,
        sectionName,
        sectionData: [],
      });
    }

    const section = sectionMap.get(sectionId)!;

    for (const value of item.sectionAttributeValues) {
      section.sectionData.push({
        characteristicId: value.characteristic.name,
        attributeId: value.attribute.name,
      });
    }
  }

  const result: OutputSectionsView[] = [];

  for (const [floorNumber, sectionMap] of floorsMap.entries()) {
    const sectionTypes = Array.from(sectionMap.values());
    result.push({ floorNumber, sectionTypes });
  }

  result.sort((a, b) => a.floorNumber - b.floorNumber);

  return result;
}
