import React, { Suspense } from "react";
import Loader from "../../../components/Loader";
import { Container } from "../../../App";
import Header from "../../../components/Header";

const NotFound = React.lazy(() => import("./NotFound"));

const LazyNotFound = () => (
  <Container>
    <Header />
    <Suspense fallback={<Loader />}>
      <NotFound />
    </Suspense>
  </Container>
);

export default LazyNotFound;
