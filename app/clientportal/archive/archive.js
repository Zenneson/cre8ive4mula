import { convertDateFormat, taskColor } from "@libs/custom";
import {
  Badge,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Image,
  ScrollArea,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useState } from "react";
import { FaRegComments } from "react-icons/fa";
import { LuFolderSearch } from "react-icons/lu";
import { usePortalState } from "../portalStore";
import classes from "./styles/archive.module.css";

const tasks = [
  {
    type: "Design",
    title: "Drawing for the March Event",
    comments: 5,
  },
  {
    type: "Content",
    title: "Changing Page Content",
    comments: 12,
  },
  {
    type: "Web Dev",
    title: "Add Feature",
    comments: 8,
  },
];

export default function Archive() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { setDrawerOpen } = usePortalState();

  const rows = tasks.map((task, index) => {
    const typeColor = taskColor(task.type);

    return (
      <Table.Tr key={index}>
        <Grid className={classes.archiveTaskGrid} mt={5}>
          <Grid.Col span="content">
            <Badge color={typeColor} variant="filled" size="xs" ml={10}>
              {task.type}
            </Badge>
          </Grid.Col>
          <Grid.Col span="auto">
            <Title className={classes.archiveTaskTitle} order={4} lineClamp={1}>
              {task.title}
            </Title>
          </Grid.Col>
          <Grid.Col span="content">
            <Badge
              rightSection={<FaRegComments size={12} />}
              color="gray.4"
              variant="outline"
              size="sm"
            >
              {task.comments}
            </Badge>
          </Grid.Col>
          <Grid.Col span="content">
            <Button
              className={classes.viewTaskBtn}
              onClick={() => setDrawerOpen(true)}
              variant="light"
              mr={10}
            >
              Open
            </Button>
          </Grid.Col>
        </Grid>
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
        <Tooltip label="File Search">
          <Box className={`panel ${classes.fileSearchBtn}`}>
            <LuFolderSearch />
          </Box>
        </Tooltip>
        <Box className={`altPanel ${classes.calendarFrame}`}>
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
        </Box>
        <Box w={"638.4px"}>
          <Group gap={7}>
            <Image
              src="/img/clientDashboard/archive/calendar.svg"
              alt="Current Date"
              width={23}
              height={23}
              opacity={0.5}
            />
            <Title tt={"uppercase"} order={6}>
              {selectedDate === null
                ? "Select a Date"
                : convertDateFormat(selectedDate)}
            </Title>
            {tasks.length === 0 && (
              <Text fz={14} c={"#fff"} mb={-2}>
                - No Tasks On This Date
              </Text>
            )}
          </Group>
          {tasks.length > 0 && (
            <Box
              className={`altPanel ${classes.tableFrame}`}
              component={ScrollArea.Autosize}
              p={0}
            >
              <Table
                verticalSpacing={8}
                withRowBorders={true}
                borderColor="rgba(255, 255, 255, 0.2)"
                my={5}
              >
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Box>
          )}
        </Box>
      </Stack>
    </Center>
  );
}
