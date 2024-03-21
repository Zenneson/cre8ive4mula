import { convertDateFormat, taskColor } from "@libs/custom";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Image,
  Input,
  ScrollArea,
  Stack,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useState } from "react";
import { FaRegComments, FaSearch } from "react-icons/fa";
import { RxShadowNone } from "react-icons/rx";
import { usePortalState } from "../portalStore";
import classes from "./styles/archive.module.css";

const tasks = [
  // {
  //   type: "Design",
  //   title: "Drawing for the March Event",
  //   comments: 5,
  //   phase: "submitted",
  // },
  // {
  //   type: "Content",
  //   title: "Changing Page Content",
  //   comments: 12,
  //   phase: "submitted",
  // },
  // {
  //   type: "Web Dev",
  //   title: "Add Feature",
  //   comments: 8,
  //   phase: "delivered",
  // },
];

export default function Archive() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { setDrawerOpen, setNotiDrawerOpen } = usePortalState();

  const rows = tasks.map((task, index) => {
    const typeColor = taskColor(task.type);

    return (
      <Table.Tr key={index}>
        <Table.Td p={0}>
          <Grid className={classes.archiveTaskGrid}>
            <Grid.Col maw={"73px"} ta={"center"} ml={10}>
              <Badge color={typeColor} variant="filled" size="xs">
                {task.type}
              </Badge>
            </Grid.Col>
            <Grid.Col span="content">
              <Tooltip
                label={task.phase === "submitted" ? "Submitted" : "Delivered"}
                position="top"
              >
                <Image
                  className={task.phase === "submitted" && classes.yellowFilter}
                  src={
                    task.phase === "submitted"
                      ? "/img/menu/submitTask.svg"
                      : "/img/clientDashboard/taskIcon.svg"
                  }
                  height={20}
                  alt={task.phase === "submitted" ? "Submitted" : "Delivered"}
                />
              </Tooltip>
            </Grid.Col>
            <Grid.Col span={"auto"} w={230} pl={0}>
              <Text className={classes.archiveTaskTitle} truncate="end">
                {task.title}
              </Text>
            </Grid.Col>
            <Grid.Col span="content">
              <Badge
                rightSection={<FaRegComments size={12} />}
                variant="transparent"
                color="gray.4"
                size="sm"
              >
                {task.comments}
              </Badge>
            </Grid.Col>
            <Grid.Col span="content">
              <Button
                className={classes.viewTaskBtn}
                onClick={() => {
                  setNotiDrawerOpen(false);
                  setDrawerOpen(true);
                }}
                variant="light"
                mr={10}
              >
                Open
              </Button>
            </Grid.Col>
          </Grid>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Center w={"100%"} pt={100}>
      <Stack
        className={`panel ${classes.archiveFrame}`}
        gap={30}
        p={30}
        align="center"
        pos={"relative"}
      >
        <Input
          rightSection={
            <ActionIcon
              size={"lg"}
              mr={10}
              className="actionBtn actionBtnDimmed"
            >
              <FaSearch />
            </ActionIcon>
          }
          rightSectionPointerEvents="all"
          placeholder="Search Tasks..."
          w={500}
        />
        <Center className={`altPanel ${classes.calendarFrame}`}>
          <DatePicker
            className={classes.archiveCalendar}
            size="xl"
            allowDeselect
            firstDayOfWeek={0}
            value={selectedDate}
            onChange={setSelectedDate}
            styles={{
              calendarHeaderLevel: {
                textTransform: "uppercase",
                fontSize: 16,
              },
              weekday: {
                color: "#3f70a8",
                fontSize: 16,
                cursor: "default",
              },
              day: {
                fontSize: 12,
              },
            }}
          />
        </Center>
        <Box w={500}>
          <Group justify="flex-end" mx={12} mb={-8}>
            <Group gap={5}>
              <Image
                className={classes.yellowFilter}
                src={"/img/menu/submitTask.svg"}
                height={17}
                alt={"Task Submitted"}
              />
              <Text fz={12}>Submitted</Text>
              <Image
                src={"/img/clientDashboard/taskIcon.svg"}
                height={17}
                alt={"Task Delivered"}
              />
              <Text fz={12}>Delivered</Text>
            </Group>
          </Group>
          <Box
            className={`${tasks.length > 0 && "altPanel"} ${
              classes.tableFrame
            }`}
            component={ScrollArea.Autosize}
            p={0}
          >
            {tasks.length === 0 && (
              <Group ta={"center"} justify="center" pt={10} gap={5} w={"100%"}>
                <RxShadowNone size={20} style={{ opacity: 0.35 }} />
                <Text className={classes.noTasksText}>
                  No Task Conveyance On
                  <Text component="span" fw={700} fz={12}>
                    {" "}
                    {convertDateFormat(selectedDate)}
                  </Text>
                </Text>
              </Group>
            )}
            {tasks.length > 0 && (
              <Table
                verticalSpacing={8}
                withRowBorders={true}
                borderColor="rgba(255, 255, 255, 0.1)"
                my={5}
              >
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            )}
          </Box>
        </Box>
      </Stack>
    </Center>
  );
}
