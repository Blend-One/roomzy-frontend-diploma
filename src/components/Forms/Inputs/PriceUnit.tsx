import { useTranslation } from "react-i18next";
import SelectFieldCustom from "./SelectFieldCustom";

const PriceUnit = () => {
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
      name={"priceUnit"}
      options={priceUnit}
      label={"Период оплаты"}
    />
  );
};
export default PriceUnit;
