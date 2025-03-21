import SelectFieldCustom from "../Inputs/SelectFieldCustom";
import { useGetsectionTypesListQuery } from "../../../services/sectionTypes";

const SectionTypeField = () => {
  const { data } = useGetsectionTypesListQuery({ page: 1, limit: 1000 });

  console.log(data);

  return (
    <SelectFieldCustom
      required
      name={"districtId"}
      options={[]}
      label={"Районы"}
    />
  );
};
export default SectionTypeField;
