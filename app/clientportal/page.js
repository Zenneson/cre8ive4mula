import { taskData } from "../../public/data/taskData";
import NotiDrawer from "./notiDrawer/notiDrawer";
import Panels from "./panels/panels";
import TaskDrawer from "./taskDrawer/taskDrawer";

export default function Portal() {
  return (
    <>
      <NotiDrawer />
      <TaskDrawer />
      <Panels taskData={taskData} />
    </>
  );
}
