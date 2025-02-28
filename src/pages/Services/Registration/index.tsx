import React, { Suspense } from "react";

const Registration = React.lazy(() => import("./Registration"));

const LazyRegistration = () => (
  <Suspense fallback={<div />}>
    <Registration />
  </Suspense>
);

export default LazyRegistration;
