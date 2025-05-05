import React, { Suspense } from "react";
import Loader from "../../components/Loader";

const Rent = React.lazy(() => import("./Rent"));

const LazyRent = () => (
  <Suspense fallback={<Loader />}>
    <Rent />
  </Suspense>
);

export default LazyRent;
