import { Button, Stack } from "@mui/material";
import { FC } from "react";
import { useFieldArray } from "react-hook-form";
import AutocompleteFieldCustom from "../../../components/Forms/Inputs/AutocompleteFieldCustom";
import { useGetCharacteristicsListQuery } from "../../../services/characteristics";
import AttributesField from "./AttributesField";

interface ISectionDataProps {
  indexFirst: number;
  indexSecond: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}

const SectionData: FC<ISectionDataProps> = ({
  indexFirst,
  indexSecond,
  control,
}) => {
  const { data: characteristics } = useGetCharacteristicsListQuery({
    page: 1,
    limit: 1000,
  });
  const characteristicsData = characteristics?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: `sections.${indexFirst}.sectionTypes.${indexSecond}.sectionData` as `sections.0.sectionTypes.0.sectionData`,
    shouldUnregister: true,
  });

  const handleAddRoom = () => {
    append({
      characteristicId: null,
      attributeId: null,
    });
  };

  return (
    <Stack spacing={2} flexGrow={1} direction="column">
      {fields.map((field, index) => (
        <Stack
          key={field.id}
          justifyItems="center"
          spacing={2}
          direction="row"
          flexGrow={1}
        >
          <AutocompleteFieldCustom
            required
            name={
              `sections.${indexFirst}.sectionTypes.${indexSecond}.sectionData.${index}.characteristicId` as const
            }
            options={characteristicsData ?? []}
            label={"Тип"}
          />
          <Stack justifyContent={"center"}>{String.fromCharCode(8212)}</Stack>
          <AttributesField
            targetField={
              `sections.${indexFirst}.sectionTypes.${indexSecond}.sectionData.${index}.characteristicId` as const
            }
            name={
              `sections.${indexFirst}.sectionTypes.${indexSecond}.sectionData.${index}.attributeId` as const
            }
          />
          {fields.length > 1 && (
            <Button
              sx={{ width: 150 }}
              variant="contained"
              onClick={() => remove(index)}
            >
              Удалить
            </Button>
          )}
        </Stack>
      ))}
      <Button variant="contained" onClick={handleAddRoom}>
        Добавить характеристику
      </Button>
    </Stack>
  );
};
export default SectionData;
