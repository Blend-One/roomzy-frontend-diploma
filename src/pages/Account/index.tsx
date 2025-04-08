import React, { Suspense } from "react";
import Loader from "../../components/Loader";

const Account = React.lazy(() => import("./Account"));

const LazyAccount = () => (
  <Suspense fallback={<Loader />}>
    <Account />
  </Suspense>
);

export default LazyAccount;
