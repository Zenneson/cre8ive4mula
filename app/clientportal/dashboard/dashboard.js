"use client";
import { Flex } from "@mantine/core";
import Board from "./board/board";
import classes from "./styles/dashboard.module.css";

export default function Dashboard(props) {
  const { taskData } = props;

  return (
    <>
      <Flex
        className={classes.boardsFrame}
        maw={1792}
        pl={125}
        pt={75}
        py={0}
        gap={20}
      >
        <Board
          boardType={"Submitted Tasks"}
          taskData={taskData.slice(0, 5)}
          num={1}
        />
        <Board
          boardType={"Tasks In-Progress"}
          taskData={[taskData[0], taskData[4]]}
          num={2}
        />
        <Board
          boardType={"Ready For Review"}
          taskData={[taskData[2]]}
          num={3}
        />
      </Flex>
    </>
  );
}
