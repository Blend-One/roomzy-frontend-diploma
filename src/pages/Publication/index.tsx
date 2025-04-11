import React, { Suspense } from "react";
import Loader from "../../components/Loader";

const Publication = React.lazy(() => import("./Publication"));

const LazyPublication = () => (
  <Suspense fallback={<Loader />}>
    <Publication />
  </Suspense>
);

export default LazyPublication;
