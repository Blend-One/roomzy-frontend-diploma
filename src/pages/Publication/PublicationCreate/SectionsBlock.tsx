import { Button, Stack } from "@mui/material";
import { FC } from "react";
import { useGetsectionTypesListQuery } from "../../../services/sectionTypes";
import { useFieldArray } from "react-hook-form";
import SectionData from "./SectionData";
import AutocompleteFieldCustom from "../../../components/Forms/Inputs/AutocompleteFieldCustom";

interface ISectionsBlockProps {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}

const SectionsBlock: FC<ISectionsBlockProps> = ({ index, control }) => {
  const { data: sectionsList } = useGetsectionTypesListQuery({
    page: 1,
    limit: 1000,
  });
  const sectData = sectionsList?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: `sections.${index}.sectionTypes` as `sections.0.sectionTypes`,
    shouldUnregister: true,
  });

  const handleAddRoom = () => {
    append({
      sectionId: null,
      sectionData: [
        {
          characteristicId: null,
          attributeId: null,
        },
      ],
    });
  };

  return (
    <>
      {fields.map((item, indexs) => (
        <Stack key={item.id} spacing={2} direction="row">
          <Stack spacing={2} width={350}>
            <AutocompleteFieldCustom
              required
              name={
                `sections.${index}.sectionTypes.${indexs}.sectionId` as const
              }
              options={sectData ?? []}
              label={"Помещение"}
            />
            {fields.length > 1 && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => remove(indexs)}
              >
                Удалить комнату
              </Button>
            )}
          </Stack>
          <SectionData
            indexFirst={index}
            indexSecond={indexs}
            control={control}
          />
        </Stack>
      ))}
      <Button variant="outlined" onClick={handleAddRoom}>
        Добавить комнату
      </Button>
    </>
  );
};
export default SectionsBlock;
