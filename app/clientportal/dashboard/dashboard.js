"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { checkScrollPosition } from "@libs/custom";
import {
  Box,
  Flex,
  Group,
  Image,
  ScrollArea,
  Stack,
  Title,
  Tooltip,
} from "@mantine/core";
import { useWindowEvent } from "@mantine/hooks";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { taskData } from "../../../public/data/taskData";
import { usePortalState } from "../portalStore";
import DashHeader from "./dashHeader";
import classes from "./styles/dashboard.module.css";
import BoardTask from "./taskCard";

const Board = ({ taskData, boardType }) => {
  const [tasks, setTasks] = useState(taskData);
  const { allowReorder, setAllowReorder } = usePortalState();
  const frameRef = useRef();

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    ) {
      return;
    }

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    setTasks(items);
  };

  const [scrollClass, setScrollClass] = useState("");
  const handleScroll = () => {
    const sp = checkScrollPosition(frameRef);
    if (sp === false) setScrollClass(classes.noScroll);
    if (sp === "top") {
      setScrollClass(classes.scrollAtTop);
    }
    if (sp === "middle") {
      setScrollClass(classes.scrollAtMiddle);
    }
    if (sp === "bottom") {
      setScrollClass(classes.scrollAtBottom);
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  useWindowEvent("resize", () => {
    handleScroll();
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack w="33%" className={`panel ${classes.boards}`} gap={0} p={0}>
        <Group className={classes.boardsHeader} justify="space-between" mb={-3}>
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
        <Box
          type="hover"
          viewportRef={frameRef}
          scrollbarSize={7}
          className={classes.taskFrame}
          component={ScrollArea.Autosize}
          onScrollPositionChange={handleScroll}
          p={0}
          pb={5}
          mx={5}
          mb={5}
        >
          <Box className={scrollClass} />
          <Droppable
            droppableId="tasks"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <AnimatePresence>
                  {tasks.map((task) => (
                    <BoardTask
                      index={task.id}
                      draggableId={task.id}
                      key={task.id}
                      taskData={task}
                      boardType={boardType}
                    />
                  ))}
                </AnimatePresence>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Box>
      </Stack>
    </DragDropContext>
  );
};

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
