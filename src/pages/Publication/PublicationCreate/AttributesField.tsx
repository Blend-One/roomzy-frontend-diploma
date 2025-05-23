import { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import AutocompleteFieldCustom from "../../../components/Forms/Inputs/AutocompleteFieldCustom";
import { useGetCharacteristicsListQuery } from "../../../services/characteristics";

interface ISectionsBlockProps {
  name: string;
  targetField: string;
}
const AttributesField: FC<ISectionsBlockProps> = ({ name, targetField }) => {
  const methods = useFormContext();
  const { watch } = methods;
  const data = watch(targetField);

  const { data: attributes } = useGetCharacteristicsListQuery(
    {
      page: 1,
      limit: 1000,
    },
    { refetchOnMountOrArgChange: true },
  );
  const attributesList = attributes?.find(
    (item) => item.id === data?.value,
  )?.attributes;

  const attributesData = attributesList?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    if (data?.value) {
      methods.setValue(name, "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <AutocompleteFieldCustom
      required
      disabled={!data?.value}
      name={name}
      options={attributesData ?? []}
      label={"Значение"}
    />
  );
};
export default AttributesField;
