import { useGetCitiesListQuery } from "../../../services/dictionaries";
import SelectFieldCustom from "../Inputs/SelectFieldCustom";

interface ICitiesFieldProps {
  required?: boolean;
  withEmpty?: boolean;
}

const CitiesField: React.FC<ICitiesFieldProps> = ({
  required = false,
  withEmpty = false,
}) => {
  const { data } = useGetCitiesListQuery({
    page: 1,
    limit: 100,
  });
  const cities = data?.map((item) => ({ value: item.id, title: item.name }));

  return (
    <SelectFieldCustom
      withEmpty={withEmpty}
      required={required}
      name={"cityId"}
      options={cities ?? []}
      label={"Города"}
    />
  );
};
export default CitiesField;
