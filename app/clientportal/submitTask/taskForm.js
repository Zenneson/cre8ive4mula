"use client";
import { Group, Image, Stack, Title } from "@mantine/core";
import classes from "./styles/taskFrom.module.css";

export default function TaskForm() {
  return (
    <Stack pt={200} gap={5}>
      <Group className={classes.taskFormTitle} gap="7">
        <Image
          src={"/img/task.svg"}
          alt={"Task Type"}
          height={25}
          opacity={0.5}
        />
        <Title order={4}>Add Details:</Title>
      </Group>
    </Stack>
  );
}
