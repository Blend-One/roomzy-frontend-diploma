import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const Moderations = React.lazy(() => import("./Moderations"));

const LazyModerations = () => (
  <Suspense fallback={<Loader />}>
    <Moderations />
  </Suspense>
);

export default LazyModerations;
