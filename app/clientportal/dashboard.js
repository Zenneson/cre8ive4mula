"use client";
import {
	ActionIcon,
	Badge,
	Box,
	Flex,
	Group,
	Image,
	Stack,
	Title,
	Tooltip,
} from "@mantine/core";
import classes from "./styles/dashboard.module.css";

export default function Dashboard(props) {
  const { setActive } = props;

  return (
    <>
      <Group justify="space-between">
        <Flex align={"center"} gap={10}>
          <Title className={classes.header} mb={"10px"} tt={"uppercase"}>
            Company Name
          </Title>
          <Badge size="md" mt={-7}>
            Pro
          </Badge>
        </Flex>

        <Group gap={0}>
          <Tooltip
            position={"bottom"}
            withArrow
            label={"Submit Task"}
            openDelay={0}
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
                height={30}
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            position={"bottom"}
            withArrow
            label={"Task Archive"}
            openDelay={0}
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
                height={30}
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            position={"bottom"}
            withArrow
            label={"File Repository"}
            openDelay={0}
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
                height={30}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      <Flex gap={20}>
        <Stack w="33%" className={`panel ${classes.boards}`}>
          <Group gap={5} className={classes.boardsHeader}>
            <Title order={2} fw={900}>
              7
            </Title>
            <Title order={6} fw={400}>
              Submitted Tasks
            </Title>
          </Group>
          <Stack className={classes.boardsInner}>
            <Box className="innerPanel">Column 1</Box>
            <Box className="innerPanel">Column 1</Box>
            <Box className="innerPanel">Column 1</Box>
            <Box className="innerPanel">Column 1</Box>
            <Box className="innerPanel">Column 1</Box>
            <Box className="innerPanel">Column 1</Box>
            <Box className="innerPanel">Column 1</Box>
          </Stack>
        </Stack>
        <Stack w="33%" className={`panel ${classes.boards}`}>
          <Group gap={5} className={classes.boardsHeader}>
            <Title order={2} fw={900}>
              3
            </Title>
            <Title order={6} fw={400}>
              Tasks In-Progress
            </Title>
          </Group>
          <Stack className={classes.boardsInner}>
            <Box className="innerPanel">Column 2</Box>
            <Box className="innerPanel">Column 2</Box>
            <Box className="innerPanel">Column 2</Box>
          </Stack>
        </Stack>
        <Stack w="33%" className={`panel ${classes.boards}`}>
          <Group gap={5} className={classes.boardsHeader}>
            <Title order={2} fw={900}>
              4
            </Title>
            <Title order={6} fw={400}>
              Tasks Ready To Review
            </Title>
          </Group>
          <Stack className={classes.boardsInner}>
            <Box className="innerPanel">Column 3</Box>
            <Box className="innerPanel">Column 3</Box>
            <Box className="innerPanel">Column 3</Box>
            <Box className="innerPanel">Column 3</Box>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
