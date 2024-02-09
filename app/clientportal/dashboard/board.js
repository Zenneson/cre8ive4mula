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
  Space,
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

export default function Board({ taskData, boardType, num }) {
  const [tasks, setTasks] = useState(taskData);
  const [taskVisibility, setTaskVisibility] = useState({});
  const [removeHeight, setRemoveHeight] = useState(false);
  const { loaded, allowReorder, setAllowReorder } = usePortalState();
  const frameRef = useRef();
  const [ref, rect] = useResizeObserver();

  const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.25,
      delay: loaded ? 0.5 : 0.25 + num * loaded ? 0 : 0.25,
    },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const boardHeight = rect.height;
  useEffect(() => {
    setTimeout(() => {
      handleScroll();
    }, 1250);
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

  const getHeight = () => {
    const init = 165.2;
    const num = tasks.length - 1;
    const taskH = 108.1;
    const add = num * taskH;

    return init + add;
  };

  const initHeight = getHeight();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        component={motion.div}
        {...animationProps}
        className={`panel ${classes.boards}`}
        onAnimationComplete={() => setRemoveHeight(true)}
        h={!removeHeight && initHeight}
        w="33%"
        mih={initHeight}
        mah={"calc(100vh - 100px)"}
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
                  alt="Close Cards"
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
          pb={7}
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
                  <Space h={8} />
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
