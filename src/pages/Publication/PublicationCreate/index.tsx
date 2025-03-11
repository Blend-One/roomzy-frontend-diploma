import React, { Suspense } from "react";

const PublicationCreate = React.lazy(() => import("./PublicationCreate"));

const LazyPublicationCreate = () => (
  <Suspense fallback={<div />}>
    <PublicationCreate />
  </Suspense>
);

export default LazyPublicationCreate;
