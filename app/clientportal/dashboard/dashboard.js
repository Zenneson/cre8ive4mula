"use client";
import { generateId } from "@libs/custom";
import { Box, Flex, Group, Image, Stack, Title, Tooltip } from "@mantine/core";
import { Reorder } from "framer-motion";
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

  useEffect(() => {
    const taskFrame = taskFrameRef.current;
    if (isOverflown(taskFrame)) {
      setAddSpace(true);
    } else {
      setAddSpace(false);
    }
  }, [taskData]);

  const [items, setItems] = useState(tasks);
  const DragTaskList = () => {
    return (
      <Reorder.Group
        className={`${classes.boardsInner} ${addSpace && classes.boardsShadow}`}
        ref={taskFrameRef}
        values={items}
        layoutScroll
        axis="y"
        style={{ overflowY: "auto" }}
        onReorder={(e) => setItems(e)}
      >
        {items.map((item, index) => (
          <Reorder.Item
            key={`item-${generateId()}`}
            value={item}
            dragListener={allowReorder && boardType === "Submitted Tasks"}
          >
            <BoardTask
              order={index + 1}
              taskData={item}
              boardType={boardType}
            />
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
        <Group gap={5}>
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
        <Board boardType={"Submitted Tasks"} taskData={taskData.slice(0, 4)} />
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
