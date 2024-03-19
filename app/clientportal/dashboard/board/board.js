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
import { RxShadowNone } from "react-icons/rx";
import { usePortalState } from "../../portalStore";
import TaskCard from "../taskCard/taskCard";
import classes from "./styles/board.module.css";

export default function Board(props) {
  const { num, taskData, boardType } = props;
  const [tasks, setTasks] = useState(taskData || []);
  const [taskVisibility, setTaskVisibility] = useState({});
  const [detailsVisibility, setDetailsVisibility] = useState({});
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
    setDetailsVisibility({});
  };

  const getHeight = () => {
    const init = 155.2;
    const num = tasks?.length - 1;
    const taskH = 108.1;
    const add = num * taskH;

    return init + add;
  };

  const initHeight = getHeight();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        ref={ref}
        component={motion.div}
        {...animationProps}
        className={`panel ${classes.boards}`}
        onAnimationComplete={() => setRemoveHeight(true)}
        h={!removeHeight && initHeight}
        mih={initHeight}
        mah={"calc(100vh - 100px)"}
        w="33%"
        gap={0}
        p={0}
      >
        <Group
          className={classes.boardsHeader}
          justify="space-between"
          mb={tasks.length > 0 ? -10 : 0}
        >
          <Group gap={5}>
            {tasks && tasks?.length > 0 ? (
              <Title order={5} fw={700}>
                {tasks.length}
              </Title>
            ) : (
              <RxShadowNone style={{ marginBottom: 2, opacity: 0.35 }} />
            )}
            <Title order={6} fw={400}>
              {boardType}
            </Title>
          </Group>
          <Group className={classes.boardsBtnsFrame} gap={5}>
            {boardType === "Submitted Tasks" && (
              <Box>
                <Tooltip label="Reorder">
                  <Image
                    src={"/img/clientDashboard/dashboard/reorder.svg"}
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
                  src={"/img/clientDashboard/dashboard/closeCard.svg"}
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
          mx={5}
          mb={0}
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
                  {tasks.length > 0 &&
                    tasks?.map((task, i) => (
                      <TaskCard
                        num={i}
                        index={task?.id}
                        draggableId={task?.id}
                        key={task?.id}
                        taskData={task}
                        boardType={boardType}
                        scrollToElement={scrollToElement}
                        viewTask={taskVisibility[task?.id] || false}
                        setViewTask={(viewTask) => {
                          setTaskVisibility((prev) => ({
                            ...prev,
                            [task?.id]: viewTask,
                          }));
                        }}
                        showDetails={detailsVisibility[task?.id] || false}
                        setShowDetails={(showDetails) => {
                          setDetailsVisibility((prev) => ({
                            ...prev,
                            [task?.id]: showDetails,
                          }));
                        }}
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
