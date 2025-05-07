import { useParams } from "react-router";
import Page from "../../../components/Page";

const ControlRent = () => {
  const { id } = useParams();
  console.log(id);
  return <Page withPadding>Lorem ipsum dolor sit amet.</Page>;
};

export default ControlRent;
