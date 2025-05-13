import React, { Suspense } from "react";
import Loader from "../../../../components/Loader";

const RentIssuesLandlord = React.lazy(() => import("./RentIssues"));

const LazyRentIssuesLandlord = () => (
  <Suspense fallback={<Loader />}>
    <RentIssuesLandlord />
  </Suspense>
);

export default LazyRentIssuesLandlord;
