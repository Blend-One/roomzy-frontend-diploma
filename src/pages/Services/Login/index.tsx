import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const Login = React.lazy(() => import("./Login"));

const LazyLogin = () => (
  <Suspense fallback={<Loader />}>
    <Login />
  </Suspense>
);

export default LazyLogin;
