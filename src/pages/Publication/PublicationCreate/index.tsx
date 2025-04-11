import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const PublicationCreate = React.lazy(() => import("./PublicationCreate"));

const LazyPublicationCreate = () => (
  <Suspense fallback={<Loader />}>
    <PublicationCreate />
  </Suspense>
);

export default LazyPublicationCreate;
