import { useTranslation } from "react-i18next";
import SelectFieldCustom from "../Inputs/SelectFieldCustom";

interface IPriceUnitProps {
  required?: boolean;
  withEmpty?: boolean;
  label: string;
  name: string;
}

const HasSelect: React.FC<IPriceUnitProps> = ({
  required = false,
  withEmpty = false,
  label,
  name,
}) => {
  const { t } = useTranslation("components");

  const data = [
    { value: "YES", title: "I18N_YES" },
    { value: "NO", title: "I18N_NO" },
  ];

  const priceUnit = data.map((item) => ({
    value: item.value,
    title: t(item.title),
  }));

  return (
    <SelectFieldCustom
      withEmpty={withEmpty}
      required={required}
      name={name}
      options={priceUnit}
      label={label}
    />
  );
};
export default HasSelect;
