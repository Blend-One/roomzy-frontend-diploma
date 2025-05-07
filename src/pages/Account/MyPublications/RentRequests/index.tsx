import React, { Suspense } from "react";
import Loader from "../../../../components/Loader";

const RentRequests = React.lazy(() => import("./RentRequests"));

const LazyRentRequests = () => (
  <Suspense fallback={<Loader />}>
    <RentRequests />
  </Suspense>
);

export default LazyRentRequests;
