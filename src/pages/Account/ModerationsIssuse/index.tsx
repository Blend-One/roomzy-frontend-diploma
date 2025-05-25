import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const ModerationsIssuse = React.lazy(() => import("../ModerationsIssuse"));

const LazyModerationsIssuse = () => (
  <Suspense fallback={<Loader />}>
    <ModerationsIssuse />
  </Suspense>
);

export default LazyModerationsIssuse;
