import React, { Suspense } from "react";
import Loader from "../../components/Loader";

const Main = React.lazy(() => import("./Main"));

const LazyMain = () => (
  <Suspense fallback={<Loader />}>
    <Main />
  </Suspense>
);

export default LazyMain;
