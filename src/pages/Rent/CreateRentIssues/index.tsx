import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const CreateRentIssues = React.lazy(() => import("./CreateRentIssues"));

const LazyCreateRentIssues = () => (
  <Suspense fallback={<Loader />}>
    <CreateRentIssues />
  </Suspense>
);

export default LazyCreateRentIssues;
