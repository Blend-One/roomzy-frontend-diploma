import SelectFieldCustom from "../Inputs/SelectFieldCustom";
import { useGetRoomTypesListQuery } from "../../../services/roomTypes";

interface IRoomTypesProps {
  required?: boolean;
  withEmpty?: boolean;
}

const RoomTypes: React.FC<IRoomTypesProps> = ({
  required = false,
  withEmpty = false,
}) => {
  const { data } = useGetRoomTypesListQuery({
    page: 1,
    limit: 10,
  });
  const rooms = data?.data.map((item) => ({
    value: item.id,
    title: item.name,
  }));

  return (
    <SelectFieldCustom
      withEmpty={withEmpty}
      required={required}
      name={"roomTypeId"}
      options={rooms ?? []}
      label={"Тип помещения"}
    />
  );
};
export default RoomTypes;
