import React, { Suspense } from "react";

const NotFound = React.lazy(() => import("./NotFound"));

const LazyNotFound = () => (
  <Suspense fallback={<div />}>
    <NotFound />
  </Suspense>
);

export default LazyNotFound;
