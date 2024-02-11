import { taskData } from "../../public/data/taskData";
import Panels from "./panels";
import TaskDrawer from "./taskDrawer/taskDrawer";

export default function Portal() {
  return (
    <>
      <TaskDrawer />
      <Panels taskData={taskData} />
    </>
  );
}
