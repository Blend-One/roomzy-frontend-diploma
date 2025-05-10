import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const RentIssues = React.lazy(() => import("./RentIssues"));

const LazyRentIssues = () => (
  <Suspense fallback={<Loader />}>
    <RentIssues />
  </Suspense>
);

export default LazyRentIssues;
