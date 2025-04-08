import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const MyPublications = React.lazy(() => import("./MyPublications"));

const LazyMyPublications = () => (
  <Suspense fallback={<Loader />}>
    <MyPublications />
  </Suspense>
);

export default LazyMyPublications;
