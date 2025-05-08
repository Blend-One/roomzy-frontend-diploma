import { useParams } from "react-router";
import Page from "../../../components/Page";
import { useGetRentByIdQuery } from "../../../services/rent";

const ControlRent = () => {
  const { id } = useParams();
  const { data } = useGetRentByIdQuery(id ?? "");
  console.log(data);

  return <Page withPadding>Lorem ipsum dolor sit amet.</Page>;
};

export default ControlRent;
