import { useAppSelector } from "../redux/hooks";
import { ITokenData } from "../types/token";

export interface IUseUserData {
  isAuthenticated: boolean;
  data: ITokenData | null;
}

const useUserData = (): IUseUserData => {
  const data = useAppSelector((state) => state.auth);
  return {
    isAuthenticated: data.isAuthenticated,
    data: data.data,
  };
};

export default useUserData;
