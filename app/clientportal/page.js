import { taskData } from "../../public/data/taskData";
import Panels from "./panels";

export default function ClientPortal() {
  return (
    <>
      <Panels taskData={taskData} />
    </>
  );
}
