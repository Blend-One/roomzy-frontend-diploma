import { useTranslation } from "react-i18next";
import SelectFieldCustom from "../Inputs/SelectFieldCustom";

interface IPriceUnitProps {
  required?: boolean;
  withEmpty?: boolean;
}

const PriceUnit: React.FC<IPriceUnitProps> = ({
  required = false,
  withEmpty = false,
}) => {
  const { t } = useTranslation("components");

  const data = [
    { value: "PER_HOUR", title: "I18N_SPACE_HOUR" },
    { value: "PER_DAY", title: "I18N_SPACE_DAY" },
    { value: "PER_MONTH", title: "I18N_SPACE_MONTH" },
  ];

  const priceUnit = data.map((item) => ({
    value: item.value,
    title: t(item.title),
  }));

  return (
    <SelectFieldCustom
      withEmpty={withEmpty}
      required={required}
      name={"priceUnit"}
      options={priceUnit}
      label={"Период оплаты"}
    />
  );
};
export default PriceUnit;
