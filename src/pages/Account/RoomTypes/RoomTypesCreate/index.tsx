import React, { Suspense } from "react";
import Loader from "../../../../components/Loader";

const RoomTypesCreate = React.lazy(() => import("./RoomTypesCreate"));

const LazyRoomTypesCreate = () => (
  <Suspense fallback={<Loader />}>
    <RoomTypesCreate />
  </Suspense>
);

export default LazyRoomTypesCreate;
