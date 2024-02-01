"use client";
import { Box, Flex, Group, Image, Stack, Title, Tooltip } from "@mantine/core";
import { Reorder, useDragControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { taskData } from "../../../public/data/taskData";
import { usePortalState } from "../portalStore";
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
  const { allowReorder, setAllowReorder } = usePortalState();
  const controls = useDragControls();

  useEffect(() => {
    const taskFrame = taskFrameRef.current;
    if (isOverflown(taskFrame)) {
      setAddSpace(true);
    } else {
      setAddSpace(false);
    }
  }, [taskData]);

  const taskList = tasks.map((task, i) => (
    <BoardTask
      key={i}
      controls={controls}
      taskData={task}
      boardType={boardType}
    />
  ));

  const [items, setItems] = useState(taskList);
  const DragTaskList = () => {
    return (
      <Reorder.Group
        className={`${classes.boardsInner} ${addSpace && classes.boardsShadow}`}
        ref={taskFrameRef}
        values={items}
        layoutScroll
        axis="y"
        style={{ overflowY: "auto" }}
        onReorder={setItems}
      >
        {items.map((item, index) => (
          <Reorder.Item
            key={index}
            value={item}
            pos={"relative"}
            dragListener={false}
            dragControls={controls}
          >
            {item}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    );
  };

  return (
    <Stack w="33%" className={`panel ${classes.boards}`}>
      <Group
        className={`${classes.boardsHeader} ${addSpace && classes.scrollSpace}`}
        justify="space-between"
      >
        <Group pos={"relative"} gap={5}>
          <Title order={4} fw={900}>
            {tasks.length}
          </Title>
          <Title order={6} fw={400}>
            {boardType}
          </Title>
        </Group>
        {boardType === "Submitted Tasks" && (
          <Box className={classes.reorderBtnFrame}>
            <Tooltip label="Reorder" position="bottom">
              <Image
                className={classes.reorder}
                src={"/img/reorder.svg"}
                alt="Reorder"
                onClick={() => setAllowReorder(!allowReorder)}
              />
            </Tooltip>
          </Box>
        )}
      </Group>
      <DragTaskList />
    </Stack>
  );
};

export default function Dashboard(props) {
  const { setActive } = props;

  return (
    <>
      <DashHeader setActive={setActive} />
      <Flex gap={20} className={classes.boardsFrame}>
        <Board boardType={"Submitted Tasks"} taskData={taskData.slice(2, 5)} />
        <Board
          boardType={"Tasks In-Progress"}
          taskData={[taskData[0], taskData[4]]}
        />
        <Board
          boardType={"Ready For Review"}
          taskData={[taskData[2], taskData[3], taskData[4]]}
        />
      </Flex>
    </>
  );
}
