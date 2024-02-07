"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import {
  allValuesFalse,
  checkScrollPosition,
  scrollToward,
} from "@libs/custom";
import {
  Box,
  Group,
  Image,
  ScrollArea,
  Stack,
  Title,
  Tooltip,
} from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePortalState } from "../portalStore";
import classes from "./styles/board.module.css";
import TaskCard from "./taskCard";

export default function Board({ taskData, boardType }) {
  const [tasks, setTasks] = useState(taskData);
  const [taskVisibility, setTaskVisibility] = useState({});
  const { allowReorder, setAllowReorder } = usePortalState();
  const frameRef = useRef();
  const [ref, rect] = useResizeObserver();

  const animationProps = {
    initial: { opacity: 0, maxHeight: 0 },
    animate: {
      opacity: 1,
      maxHeight: "calc(100vh - 100px)",
    },
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

  const boardHeight = rect.height;
  useEffect(() => {
    handleScroll();
  }, [boardHeight]);

  const scrollToElement = (element) => {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const cardsAreClosed =
    Object.keys(taskVisibility).length === 0 || allValuesFalse(taskVisibility);
  const closeCards = () => {
    if (cardsAreClosed) return;
    setTaskVisibility({});
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
        ref={ref}
      >
        <Group className={classes.boardsHeader} justify="space-between" mb={-3}>
          <Group gap={8}>
            <Title order={4} fw={900}>
              {tasks.length}
            </Title>
            <Title order={6} fw={400}>
              {boardType}
            </Title>
          </Group>
          <Group className={classes.boardsBtnsFrame} gap={5}>
            {boardType === "Submitted Tasks" && (
              <Box>
                <Tooltip label="Reorder">
                  <Image
                    src={"/img/reorder.svg"}
                    alt="Reorder"
                    onClick={() => setAllowReorder(!allowReorder)}
                  />
                </Tooltip>
              </Box>
            )}
            <Box>
              <Tooltip
                label={
                  cardsAreClosed ? "Task Cards are Closed" : "Close All Cards"
                }
              >
                <Image
                  className={cardsAreClosed && classes.allCardsClosed}
                  src={"/img/closeCard.svg"}
                  alt="Reorder"
                  onClick={closeCards}
                />
              </Tooltip>
            </Box>
          </Group>
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
                      viewTask={taskVisibility[task.id] || false}
                      setViewTask={(viewTask) =>
                        setTaskVisibility((prev) => ({
                          ...prev,
                          [task.id]: viewTask,
                        }))
                      }
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
