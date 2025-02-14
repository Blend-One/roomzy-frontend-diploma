import { AppDispatch } from "@/redux";
import { useDispatch } from "react-redux";

const useAppDispatch = () => useDispatch<AppDispatch>();
export default useAppDispatch;
