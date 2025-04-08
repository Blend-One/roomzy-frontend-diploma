import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const Registration = React.lazy(() => import("./Registration"));

const LazyRegistration = () => (
  <Suspense fallback={<Loader />}>
    <Registration />
  </Suspense>
);

export default LazyRegistration;
