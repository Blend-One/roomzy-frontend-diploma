import React, { Suspense } from "react";

const MyPublications = React.lazy(() => import("./MyPublications"));

const LazyMyPublications = () => (
  <Suspense fallback={<div />}>
    <MyPublications />
  </Suspense>
);

export default LazyMyPublications;
