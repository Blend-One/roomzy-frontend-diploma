import React, { Suspense } from "react";
import Loader from "../../../../components/Loader";

const RoomTypesEdit = React.lazy(() => import("./RoomTypesEdit"));

const LazyRoomTypesEdit = () => (
  <Suspense fallback={<Loader />}>
    <RoomTypesEdit />
  </Suspense>
);

export default LazyRoomTypesEdit;
