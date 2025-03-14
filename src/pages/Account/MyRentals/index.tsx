import React, { Suspense } from "react";

const MyRentals = React.lazy(() => import("./MyRentals"));

const LazyMyRentals = () => (
  <Suspense fallback={<div />}>
    <MyRentals />
  </Suspense>
);

export default LazyMyRentals;
