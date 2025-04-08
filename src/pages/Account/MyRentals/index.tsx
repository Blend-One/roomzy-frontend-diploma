import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const MyRentals = React.lazy(() => import("./MyRentals"));

const LazyMyRentals = () => (
  <Suspense fallback={<Loader />}>
    <MyRentals />
  </Suspense>
);

export default LazyMyRentals;
