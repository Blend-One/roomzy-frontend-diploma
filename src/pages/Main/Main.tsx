import { useAppSelector } from "../../redux/hooks";

const Main = () => {
  const userData = useAppSelector((state) => state.auth.data);
  console.table(userData);
  return <>hi</>;
};

export default Main;
