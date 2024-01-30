"use client";
import { Box, Flex, Group, Stack, Title } from "@mantine/core";
import BoardTask from "./boardTask";
import DashHeader from "./dashHeader";
import classes from "./styles/dashboard.module.css";

const taskData = [
  {
    id: 1,
    type: "Design",
    service: "Logo Design",
    title: "Drawing for the March Event",
    date: "JAN 10th, 2024",
    tags: ["Modern", "Classic", "Bright", "Realistic", "Bold", "Engaging"],
    files: ["file1.docx", "file2.docx", "file3.docx", "file4.docx"],
    colors: [
      "#FFCDB2",
      "#FFB4A2",
      "#E5989B",
      "#B5838D",
      "#6D6875",
      "#FFCDB2",
      "#FFB4A2",
      "#E5989B",
      "#B5838D",
      "#6D6875",
    ],
  },
  {
    id: 2,
    type: "Content",
    service: "Content Editing",
    title: "Changing Page Content",
    date: "JAN 12th, 2024",
    files: ["file1.docx", "file2.docx"],
  },
  {
    id: 3,
    type: "Web Dev",
    service: "Add Feature",
    title: "Adding New Page",
    date: "JAN 10th, 2024",
    files: ["file1.docx", "file2.docx", "file3.docx"],
  },
  {
    id: 4,
    type: "Design",
    service: "Event Flyer Design",
    title: "Drawing for the Wedding Event",
    date: "JAN 10th, 2024",
    tags: ["Elegant", "Stylish", "Vibrant", "Creative", "Eye-catching, Formal"],
    files: ["file1.docx"],
    colors: ["#F9A826", "#F48C06", "#E85D04", "#DC2F02", "#9D0208"],
  },
];

const taskList = taskData.map((task) => (
  <BoardTask key={task.id} taskData={task} />
));

export default function Dashboard(props) {
  const { setActive } = props;

  return (
    <>
      <DashHeader setActive={setActive} />
      <Flex gap={20} className={classes.boardsFrame}>
        <Stack w="33%" className={`panel ${classes.boards}`}>
          <Group gap={5} className={classes.boardsHeader}>
            <Title order={3} fw={900}>
              {taskData.length}
            </Title>
            <Title order={6} fw={400}>
              Submitted Tasks
            </Title>
          </Group>
          <Stack className={classes.boardsInner}>{taskList}</Stack>
        </Stack>
        <Stack w="33%" className={`panel ${classes.boards}`}>
          <Group gap={5} className={classes.boardsHeader}>
            <Title order={3} fw={900}>
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
            <Title order={3} fw={900}>
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
