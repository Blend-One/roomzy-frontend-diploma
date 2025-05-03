import React, { Suspense } from "react";
import Loader from "../../../components/Loader";

const RoomTypes = React.lazy(() => import("./RoomTypes"));

const LazyRoomTypes = () => (
  <Suspense fallback={<Loader />}>
    <RoomTypes />
  </Suspense>
);

export default LazyRoomTypes;
