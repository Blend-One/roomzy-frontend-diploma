import useUserData from "./useUserData";

const useHasRole = (role: string): boolean => {
  const userdata = useUserData();
  return userdata.data?.role === role;
};
export default useHasRole;
