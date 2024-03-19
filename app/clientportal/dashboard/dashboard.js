"use client";
import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import Board from "./board/board";
import classes from "./styles/dashboard.module.css";

export default function Dashboard(props) {
  const { taskData } = props;
  const [submittedTasks, setSubmittedTasks] = useState(
    taskData.length > 0 ? taskData.slice(0, 5) : []
  );
  const [tasksInProgress, setTasksInProgress] = useState(
    taskData.length > 0 ? [taskData[0], taskData[4]] : []
  );
  const [readyForReview, setReadyForReview] = useState(
    taskData.length > 0 ? [taskData[2]] : []
  );

  useEffect(() => {
    if (taskData && taskData.length > 0) {
      setSubmittedTasks(taskData?.slice(0, 5));
      setTasksInProgress([taskData[0], taskData[4]]);
      setReadyForReview([taskData[2]]);
    }
  }, [taskData]);

  return (
    <>
      <Flex className={classes.boardsFrame} gap={20}>
        <Board
          num={1}
          taskData={submittedTasks}
          boardType={
            submittedTasks.length === 0
              ? "No Uncommenced Tasks"
              : "Submitted Tasks"
          }
        />
        <Board
          num={2}
          taskData={tasksInProgress}
          boardType={
            tasksInProgress.length === 0
              ? "No Tasks Currently In-Progress"
              : "Tasks In-Progress"
          }
        />
        <Board
          num={3}
          taskData={readyForReview}
          boardType={
            readyForReview.length === 0
              ? "There Are No Tasks Ready For Review"
              : "Ready For Review"
          }
        />
      </Flex>
    </>
  );
}
