"use client";
import {
  ActionIcon,
  Badge,
  Flex,
  Group,
  Image,
  Title,
  Tooltip,
} from "@mantine/core";
import classes from "./styles/dashboard.module.css";

export default function DashHeader(props) {
  const { setActive } = props;

  return (
    <Group justify="space-between">
      <Flex align={"center"} gap={10}>
        <Title fz={35} mb={"10px"} tt={"uppercase"}>
          Company Name
        </Title>
        <Badge size="md" mt={-8}>
          Pro
        </Badge>
      </Flex>

      <Group gap={0}>
        <Tooltip
          position={"bottom"}
          withArrow
          label={"Submit Task"}
          openDelay={0}
          offset={-3}
        >
          <ActionIcon
            size="xl"
            variant="transparent"
            className={classes.topRightBtns}
            onClick={() => setActive(1)}
          >
            <Image
              src={"/img/menu/submitTask.svg"}
              alt={"Submit Task"}
              height={25}
            />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          position={"bottom"}
          withArrow
          label={"Task Archive"}
          openDelay={0}
          offset={-3}
        >
          <ActionIcon
            size="xl"
            variant="transparent"
            className={classes.topRightBtns}
            onClick={() => setActive(2)}
          >
            <Image
              src={"/img/menu/taskArchive.svg"}
              alt={"Task Archive"}
              height={25}
            />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          position={"bottom"}
          withArrow
          label={"File Repository"}
          openDelay={0}
          offset={-3}
        >
          <ActionIcon
            size="xl"
            variant="transparent"
            className={classes.topRightBtns}
            onClick={() => setActive(3)}
          >
            <Image
              src={"/img/menu/fileRepo.svg"}
              alt={"File Repository"}
              height={25}
            />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
}
