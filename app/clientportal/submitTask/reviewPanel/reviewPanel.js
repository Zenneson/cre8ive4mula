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
import ColorPuck from "../../colorPuck/colorPuck";
import { usePortalState, useSubissionData } from "../../portalStore";
import classes from "./styles/reviewPanel.module.css";

export default function ReviewPanel() {
  const { formData, setSubmissionPanel } = useSubissionData();
  const { setActivePanel } = usePortalState();
  const typeColor = taskColor(formData.type?.title);

  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { delay: 1 },
  };

  const colors = formData.colors;
  const colorRow = colors.map((color, index) => {
    const rgb = hexToRgb(color);
    return <ColorPuck key={index} color={color} isTaskFrom={false} rgb={rgb} />;
  });

  const styleKeywords = formData.styleKeywords;
  const websites = formData.websites;
  const files = formData.files;

  const isExtraData =
    styleKeywords.length > 0 ||
    websites.length > 0 ||
    files.length > 0 ||
    colors.length > 0;

  const DetailsRow = (props) => {
    const { icon, alt, details } = props;
    return (
      <Group>
        <Image
          className={classes.reviewIcon}
          src={`/img/${icon}.svg`}
          alt={alt}
          fit="contain"
          mt={4}
          w={30}
        />
        <Flex
          w={"603.5px"}
          wrap={"wrap"}
          h={"30px"}
          rowGap={"5px"}
          columnGap={"5px"}
          align={"center"}
        >
          {details.map((detail, index) => (
            <Badge key={index} color="#fff" variant="outline" size="xs" mt={5}>
              {detail}
            </Badge>
          ))}
        </Flex>
      </Group>
    );
  };

  return (
    <motion.div {...animation}>
      <Box w={800} mt={-150}>
        <Stack className={classes.reviewTitle} ml={-7} gap={0}>
          <Badge
            className={classes.taskType}
            color={typeColor}
            ml={48}
            mb={3}
            size="md"
            variant={"filled"}
          >
            {formData.type?.title}
          </Badge>
          <Group gap="7">
            <Image
              src={"/img/addTask.svg"}
              alt={"Task Type"}
              height={40}
              opacity={0.5}
            />
            <Title order={1}>{formData.title}</Title>
          </Group>
          <Text ml={48}>{formData.service}</Text>
        </Stack>
        <Stack mx={40} gap={25}>
          <Stack className="innerPanel" gap={20} p={20}>
            <Box
              className="altPanel"
              hidden={formData.type?.title !== "Web Dev"}
            >
              <Title order={6} tt={"uppercase"}>
                Intended Goal:
              </Title>
              {formData.goal}
            </Box>
            <Box className={`altPanel ${classes.taskDescFrame}`}>
              <Title order={6} tt={"uppercase"}>
                Description:
              </Title>
              {formData.desc}
            </Box>
          </Stack>
          {isExtraData && (
            <Stack className="altPanel" gap={5} px={30}>
              <Box hidden={formData.type?.title !== "Design"}>
                {colors && colors.length > 0 && (
                  <Group>
                    <Image
                      className={classes.reviewIcon}
                      src="/img/colorPalette.svg"
                      alt={"Color Palette"}
                      fit="contain"
                      my={4}
                      w={30}
                    />
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
                {styleKeywords && styleKeywords.length > 0 && (
                  <DetailsRow
                    icon={"hashtag"}
                    alt={"Style Keywords"}
                    details={styleKeywords}
                  />
                )}
              </Box>
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
            </Stack>
          )}
          <Group justify="flex-end">
            <Button
              className={classes.backBtn}
              leftSection={
                <FaPlay
                  size={10}
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
