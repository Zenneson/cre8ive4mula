"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { checkScrollPosition, scrollToward } from "@libs/custom";
import {
  Box,
  Group,
  Image,
  ScrollArea,
  Stack,
  Title,
  Tooltip,
} from "@mantine/core";
import { useWindowEvent } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePortalState } from "../portalStore";
import classes from "./styles/board.module.css";
import TaskCard from "./taskCard";

export default function Board({ taskData, boardType }) {
  const [tasks, setTasks] = useState(taskData);
  const { allowReorder, setAllowReorder } = usePortalState();
  const frameRef = useRef();

  const animationProps = {
    initial: { x: -50, opacity: 0, maxHeight: 0 },
    animate: {
      x: 0,
      opacity: 1,
      maxHeight: "calc(100vh - 100px)",
    },
    exit: { x: -50, opacity: 0, height: 0 },
    transition: { duration: 2, delay: taskData.id * 0.1 },
  };

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
  const [scrollSpot, setScrollSpot] = useState("");
  const handleScroll = () => {
    const sp = checkScrollPosition(frameRef);
    if (sp === "top") {
      setScrollClass(classes.scrollAtTop);
      setScrollSpot("top");
      return;
    }
    if (sp === "middle") {
      setScrollClass(classes.scrollAtMiddle);
      setScrollSpot("middle");
      return;
    }
    if (sp === "bottom") {
      setScrollClass(classes.scrollAtBottom);
      setScrollSpot("bottom");
      return;
    }
    if (sp === false) {
      setScrollClass(classes.noScroll);
      setScrollSpot("none");
      return;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleScroll();
    }, 2000);
  }, []);

  useWindowEvent("resize", () => {
    handleScroll();
  });

  const scrollToElement = (element) => {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        component={motion.div}
        {...animationProps}
        w="33%"
        className={`panel ${classes.boards}`}
        gap={0}
        p={0}
      >
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
          type="never"
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
          <Box
            onMouseEnter={() => scrollToward.start(frameRef, "up")}
            onMouseLeave={() => scrollToward.stop()}
            className={`${classes.scrollTowardTop} ${
              (scrollSpot === "top" || scrollSpot === "none") && classes.shrunk
            }`}
          />
          <Box
            onMouseEnter={() => scrollToward.start(frameRef, "down")}
            onMouseLeave={() => scrollToward.stop()}
            className={`${classes.scrollTowardBottom} ${
              (scrollSpot === "bottom" || scrollSpot === "none") &&
              classes.shrunk
            }`}
          />
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
                    <TaskCard
                      index={task.id}
                      draggableId={task.id}
                      key={task.id}
                      taskData={task}
                      boardType={boardType}
                      scrollToElement={scrollToElement}
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
}
