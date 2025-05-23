import { useFormContext, useWatch } from "react-hook-form";
import { useGetDistrictsByCityIdListQuery } from "../../../services/dictionaries";
import SelectFieldCustom from "../Inputs/SelectFieldCustom";
import { useEffect, useMemo } from "react";

interface IDistrictsFieldProps {
  required?: boolean;
  withEmpty?: boolean;
}

const DistrictsField: React.FC<IDistrictsFieldProps> = ({
  required = false,
  withEmpty = false,
}) => {
  const city = useWatch({ name: "cityId" });
  const methods = useFormContext();

  const { data } = useGetDistrictsByCityIdListQuery(
    {
      cityId: city,
      page: 1,
      limit: 100,
    },
    { skip: !city },
  );

  useEffect(() => {
    methods.setValue("districtId", "");
  }, [city, methods]);

  const districts = useMemo(
    () => data?.map((item) => ({ value: item.id, title: item.name })),
    [data],
  );

  return (
    <SelectFieldCustom
      withEmpty={withEmpty}
      required={required}
      disabled={!city}
      name={"districtId"}
      options={districts ?? []}
      label={"Районы"}
    />
  );
};
export default DistrictsField;
