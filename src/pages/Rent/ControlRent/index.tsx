import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const ControlRent = React.lazy(() => import("./ControlRent"));

const LazyControlRent = () => (
  <Suspense fallback={<Loader />}>
    <ControlRent />
  </Suspense>
);

export default LazyControlRent;
