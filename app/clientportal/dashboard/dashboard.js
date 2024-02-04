"use client";
import { Flex } from "@mantine/core";
import { taskData } from "../../../public/data/taskData";
import Board from "./board";
import DashHeader from "./dashHeader";
import classes from "./styles/dashboard.module.css";

export default function Dashboard(props) {
  const { setActive } = props;

  return (
    <>
      <DashHeader setActive={setActive} />
      <Flex gap={20} className={classes.boardsFrame}>
        <Board boardType={"Submitted Tasks"} taskData={taskData.slice(0, 8)} />
        <Board
          boardType={"Tasks In-Progress"}
          taskData={[taskData[0], taskData[4]]}
        />
        <Board
          boardType={"Ready For Review"}
          taskData={[taskData[2], taskData[3]]}
        />
      </Flex>
    </>
  );
}
