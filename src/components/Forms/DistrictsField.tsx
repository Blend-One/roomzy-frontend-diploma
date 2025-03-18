import { useFormContext, useWatch } from "react-hook-form";
import { useGetDistrictsByCityIdListQuery } from "../../services/dictionaries";
import SelectFieldCustom from "./Inputs/SelectFieldCustom";
import { useEffect, useMemo } from "react";

const DistrictsField = () => {
  const city = useWatch({ name: "city" });
  const methods = useFormContext();

  const { data } = useGetDistrictsByCityIdListQuery(
    {
      cityId: city,
      page: 1,
      limit: 1000,
    },
    { skip: !city }
  );

  useEffect(() => {
    methods.setValue("districts", "");
  }, [city, methods]);

  const districts = useMemo(
    () => data?.map((item) => ({ value: item.id, title: item.name })),
    [data]
  );

  return (
    <SelectFieldCustom
      disabled={!city}
      name={"districts"}
      options={districts ?? []}
      label={"Районы"}
    />
  );
};
export default DistrictsField;
