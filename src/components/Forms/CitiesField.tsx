import { useGetCitiesListQuery } from "../../services/dictionaries";
import SelectFieldCustom from "./Inputs/SelectFieldCustom";

const CitiesField = () => {
  const { data } = useGetCitiesListQuery({
    page: 1,
    limit: 1000,
  });
  const cities = data?.map((item) => ({ value: item.id, title: item.name }));

  return (
    <SelectFieldCustom
      name={"cityId"}
      options={cities ?? []}
      label={"Города"}
    />
  );
};
export default CitiesField;
