"use client";
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
import { useRef, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { taskData } from "../../../public/data/taskData";
import { usePortalState } from "../portalStore";
import BoardTask from "./boardTask";
import DashHeader from "./dashHeader";
import classes from "./styles/dashboard.module.css";

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

  const DragTaskList = ({ tasks }) => {
    return tasks.map((task, index) => (
      <BoardTask
        key={index}
        index={index}
        taskData={task}
        boardType={boardType}
        draggableId={"task-" + index}
      />
    ));
  };

  const [scrollClass, setScrollClass] = useState("");
  const handleScroll = () => {
    const sp = checkScrollPosition(frameRef);
    if (sp === false) setScrollClass("");
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

  useWindowEvent("resize", () => {
    handleScroll();
  });

  return (
    <Stack w="33%" className={`panel ${classes.boards}`} gap={0}>
      <Group className={classes.boardsHeader} justify="space-between">
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <Box
              type="hover"
              viewportRef={frameRef}
              scrollbarSize={7}
              className={`classes.taskFrame ${scrollClass}`}
              component={ScrollArea.Autosize}
              onScrollPositionChange={handleScroll}
              ref={provided.innerRef}
              {...provided.droppableProps}
              py={5}
              px={7}
            >
              {console.log("🚀 ~ Board ~ provided:", provided)}
              <AnimatePresence>
                <DragTaskList tasks={tasks} />
              </AnimatePresence>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Stack>
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

// This is a hack to prevent the following error from showing up in the console:
// Warning: Connect(Droppable): Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};
