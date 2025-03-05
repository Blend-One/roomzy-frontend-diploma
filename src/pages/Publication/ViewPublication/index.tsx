import React, { Suspense } from "react";

const ViewPublication = React.lazy(() => import("./ViewPublication"));

const LazyViewPublication = () => (
  <Suspense fallback={<div />}>
    <ViewPublication />
  </Suspense>
);

export default LazyViewPublication;
