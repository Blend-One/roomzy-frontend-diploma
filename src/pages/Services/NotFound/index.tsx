import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const NotFound = React.lazy(() => import("./NotFound"));

const LazyNotFound = () => (
  <Suspense fallback={<Loader />}>
    <NotFound />
  </Suspense>
);

export default LazyNotFound;
