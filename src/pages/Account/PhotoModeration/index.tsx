import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const PhotoModeration = React.lazy(() => import("./PhotoModeration"));

const LazyPhotoModeration = () => (
  <Suspense fallback={<Loader />}>
    <PhotoModeration />
  </Suspense>
);

export default LazyPhotoModeration;
