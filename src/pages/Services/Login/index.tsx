import React, { Suspense } from "react";

const Login = React.lazy(() => import("./Login"));

const LazyLogin = () => (
  <Suspense fallback={<div />}>
    <Login />
  </Suspense>
);

export default LazyLogin;
