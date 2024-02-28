import CustomLoader from "@libs/loader/customLoader";
import { Suspense } from "react";
import ClientHeader from "./clientHeader/clientHeader";
import Navbar from "./navbar/navbar";
import Portal from "./page";

export default function ClientPortalLayout() {
  return (
    <>
      <Navbar />
      <ClientHeader />
      <Suspense fallback={<CustomLoader mode={"default"} />}>
        <Portal />
      </Suspense>
    </>
  );
}
