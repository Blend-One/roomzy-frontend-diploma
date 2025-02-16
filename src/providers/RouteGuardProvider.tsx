"use client";

// import { useRouter } from 'next/navigation';
import { ReactNode, FC } from 'react';

const RouteGuardProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // const router = useRouter(); 

  return <>{children}</>;
};
 
export default RouteGuardProvider;
