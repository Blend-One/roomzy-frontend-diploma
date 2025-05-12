import React, { Suspense } from "react";
import Loader from "../../../../components/Loader";

const RentIssues = React.lazy(() => import("./RentIssues"));

const LazyRenterIssues = () => (
  <Suspense fallback={<Loader />}>
    <RentIssues />
  </Suspense>
);

export default LazyRenterIssues;
