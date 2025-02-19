import React, { Suspense } from "react";

const Publication = React.lazy(() => import("./Publication"));

const LazyPublication = () => (
  <Suspense fallback={<div />}>
    <Publication />
  </Suspense>
);

export default LazyPublication;
