import React, { Suspense } from "react";

const Main = React.lazy(() => import("./Main"));

const LazyMain = () => (
  <Suspense fallback={<div />}>
    <Main />
  </Suspense>
);

export default LazyMain;
