import { hexToRgb, taskColor } from "@libs/custom";
import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { motion } from "framer-motion";
import { FaFlagCheckered, FaPlay } from "react-icons/fa";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import ColorPuck from "../../colorPuck/colorPuck";
import { usePortalState, useSubissionData } from "../../portalStore";
import classes from "./styles/reviewPanel.module.css";

export default function ReviewPanel() {
  const { taskType, formData, setSubmissionPanel } = useSubissionData();
  const { setActivePanel } = usePortalState();
  const typeColor = taskColor(taskType);

  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { delay: 1 },
  };

  const colorRow = formData.colors?.map((color, index) => {
    const rgb = hexToRgb(color);
    return <ColorPuck key={index} color={color} isTaskFrom={false} rgb={rgb} />;
  });

  // const styleKeywords = formData.styleKeywords;
  // const websites = formData.websites;
  // const files = formData.files;
  const styleKeywords = [
    "Modern",
    "Minimal",
    "Clean",
    "Simple",
    "Elegant",
    "Modern",
    "Minimal",
    "Clean",
    "Simple",
    "Elegant",
  ];
  const websites = [
    "example.com",
    "example.com",
    "example.com",
    "example.com",
    "example.com",
    "example.com",
    "example.com",
    "example.com",
    "example.com",
    "example.com",
  ];
  const files = [
    "file1.jpg",
    "file2.jpg",
    "file3.jpg",
    "file4.jpg",
    "file5.jpg",
    "file6.jpg",
    "file7.jpg",
    "file8.jpg",
    "file9.jpg",
    "file10.jpg",
  ];

  const DetailsRow = (props) => {
    const { icon, alt, details } = props;
    return (
      <Group mb={10} className={`altPanel ${classes.detailsFrame}`}>
        <Group gap={7} w={135}>
          <Image
            className={classes.reviewIcon}
            src={`/img/clientDashboard/${icon}.svg`}
            alt={alt}
            fit="contain"
            mt={4}
            w={25}
          />
          <Title order={1} fz={10} mt={3} tt={"uppercase"}>
            {alt}
          </Title>
        </Group>
        <Flex
          w={"calc(100% - 155px)"}
          wrap={"wrap"}
          h={"30px"}
          rowGap={"5px"}
          columnGap={"10px"}
          align={"center"}
        >
          {details.map((detail, index) => (
            <Badge key={index} color="#fff" variant="light" size="xs">
              {detail}
            </Badge>
          ))}
        </Flex>
      </Group>
    );
  };

  return (
    <motion.div {...animation}>
      <Box w={800} mt={-200}>
        <Stack className={classes.reviewTitle} gap={0}>
          <Group gap="7" mb={3}>
            <Image
              src={"/img/clientDashboard/submit/addTask.svg"}
              alt={"Task Type"}
              height={35}
              opacity={0.5}
            />
            <Title order={1}>{formData.title}</Title>
          </Group>
          <Group gap={3}>
            <Badge
              className={classes.taskType}
              color={typeColor}
              variant={"filled"}
              size="md"
            >
              {taskType}
            </Badge>
            <RiArrowRightDoubleFill size={20} opacity={0.25} />
            <Text tt={"uppercase"} fz={14}>
              {formData.service}
            </Text>
          </Group>
        </Stack>
        <Stack gap={20}>
          <Stack className="panel" gap={20} p={20}>
            {taskType === "Web Dev" && (
              <Box pos={"relative"}>
                <Badge
                  className={"descBadge"}
                  size="xs"
                  variant="gradient"
                  gradient={{ from: "#8fbaeb", to: "#7fb1ea", deg: 180 }}
                >
                  Goal
                </Badge>
                <Box className="textPanel">{formData.goal}</Box>
              </Box>
            )}
            <Box pos={"relative"}>
              <Badge
                className={"descBadge"}
                size="xs"
                variant="gradient"
                gradient={{ from: "#8fbaeb", to: "#7fb1ea", deg: 180 }}
              >
                Description
              </Badge>
              <Box className={"textPanel"} mih={91}>
                {formData.desc}
              </Box>
            </Box>
          </Stack>
          <Stack className="panel" gap={5}>
            {websites && websites.length > 0 && (
              <DetailsRow
                icon={"website"}
                alt={"Related Links"}
                details={websites}
              />
            )}
            {files && files.length > 0 && (
              <DetailsRow
                icon={"paperclip"}
                alt={"Project Files"}
                details={files}
              />
            )}
            {styleKeywords && styleKeywords.length > 0 && (
              <DetailsRow
                icon={"hashtag"}
                alt={"Style Keywords"}
                details={styleKeywords}
              />
            )}
            {formData && formData.colors.length > 0 && (
              <Group className={`altPanel ${classes.detailsFrame}`} my={5}>
                <Group gap={7} pr={12.5}>
                  <Image
                    className={classes.reviewIcon}
                    src="/img/clientDashboard/colorPalette.svg"
                    alt={"Color Palette"}
                    fit="contain"
                    my={4}
                    w={25}
                  />
                  <Title order={1} fz={10} mt={1} tt={"uppercase"}>
                    Colors:
                  </Title>
                </Group>
                <Flex
                  justify={"flex-start"}
                  align={"center"}
                  gap={"17.6%"}
                  pl={"3px"}
                  mah={40}
                >
                  {colorRow}
                </Flex>
              </Group>
            )}
          </Stack>
          <Group justify="flex-end">
            <Button
              className={classes.backBtn}
              leftSection={
                <FaPlay
                  size={8}
                  style={{
                    transform: "rotate(180deg)",
                  }}
                />
              }
              onClick={() => setSubmissionPanel(1)}
            >
              Back
            </Button>
            <Button
              rightSection={<FaFlagCheckered size={15} />}
              onClick={() => setActivePanel(0)}
              fz={15}
            >
              Submit Task
            </Button>
          </Group>
        </Stack>
      </Box>
    </motion.div>
  );
}
