import React, { Suspense } from "react";

const Home = React.lazy(() => import("./Home"));

const LazyHome = () => (
  <Suspense fallback={<div />}>
    <Home />
  </Suspense>
);

export default LazyHome;
