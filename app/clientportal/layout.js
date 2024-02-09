import CustomLoader from "@libs/loader/customLoader";
import { Suspense } from "react";
import ClientHeader from "./clientHeader";
import Navbar from "./navbar";
import ClientPortal from "./page";

export default function ClientPortalLayout() {
  return (
    <>
      <Navbar />
      <ClientHeader />
      <Suspense fallback={<CustomLoader />}>
        <ClientPortal />
      </Suspense>
    </>
  );
}
