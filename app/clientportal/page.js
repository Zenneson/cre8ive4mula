import CustomLoader from "@libs/loader/customLoader";
import { taskData } from "../../public/data/taskData";
import DashHeader from "./clientHeader";
import Navbar from "./navbar";
import Panels from "./panels";

export default function clientPortal() {
  return (
    <>
      <Navbar />
      <DashHeader />
      <CustomLoader loaded={taskData} />
      <Panels taskData={taskData} />
    </>
  );
}
