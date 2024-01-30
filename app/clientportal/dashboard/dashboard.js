"use client";
import { Flex, Group, Stack, Title } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { taskData } from "../../../public/data/taskData";
import BoardTask from "./boardTask";
import DashHeader from "./dashHeader";
import classes from "./styles/dashboard.module.css";

const isOverflown = (element) => {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
};

const Board = ({ taskData, boardType }) => {
  const tasks = taskData;
  const taskFrameRef = useRef(null);
  const [addSpace, setAddSpace] = useState(false);

  useEffect(() => {
    const taskFrame = taskFrameRef.current;
    if (isOverflown(taskFrame)) {
      setAddSpace(true);
    } else {
      setAddSpace(false);
    }
  }, []);

  const taskList = tasks.map((task) => (
    <BoardTask key={task.id} taskData={task} boardType={boardType} />
  ));

  return (
    <Stack w="33%" className={`panel ${classes.boards}`}>
      <Group
        gap={5}
        className={`${classes.boardsHeader} ${addSpace && classes.scrollSpace}`}
      >
        <Title order={4} fw={900}>
          {tasks.length}
        </Title>
        <Title order={6} fw={400}>
          {boardType}
        </Title>
      </Group>
      <Stack
        ref={taskFrameRef}
        className={`${classes.boardsInner} ${addSpace && classes.boardsShadow}`}
      >
        {taskList}
      </Stack>
    </Stack>
  );
};

export default function Dashboard(props) {
  const { setActive } = props;

  return (
    <>
      <DashHeader setActive={setActive} />
      <Flex gap={20} className={classes.boardsFrame}>
        <Board boardType={"Submitted Tasks"} taskData={taskData} />
        <Board
          boardType={"Tasks In-Progress"}
          taskData={[taskData[0], taskData[6]]}
        />
        <Board
          boardType={"Ready For Review"}
          taskData={[taskData[2], taskData[7], taskData[8]]}
        />
      </Flex>
    </>
  );
}
