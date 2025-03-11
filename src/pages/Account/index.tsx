import React, { Suspense } from "react";

const Account = React.lazy(() => import("./Account"));

const LazyAccount = () => (
  <Suspense fallback={<div />}>
    <Account />
  </Suspense>
);

export default LazyAccount;
