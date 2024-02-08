import { taskColor } from "@libs/custom";
import {
  Badge,
  Box,
  Button,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { motion } from "framer-motion";
import { FaFlagCheckered, FaPlay } from "react-icons/fa";
import { useSubissionData } from "../portalStore";
import classes from "./styles/reviewPanel.module.css";

export default function ReviewPanel() {
  const { formData, setSubmissionPanel } = useSubissionData();
  const typeColor = taskColor(formData.type?.title);

  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { delay: 1 },
  };

  return (
    <motion.div {...animation}>
      <Box w={800} mt={-150}>
        <Stack className={classes.reviewTitle} gap={0}>
          <Badge
            className={classes.taskType}
            color={typeColor}
            c={formData.type?.title === "Web Dev" ? "#000" : "#fff"}
            ml={45}
            mb={7}
            size="md"
            variant={"filled"}
          >
            {formData.type?.title}
          </Badge>
          <Group gap="7">
            <Image
              src={"/img/task.svg"}
              alt={"Task Type"}
              height={40}
              opacity={0.5}
            />
            <Title order={1}>{formData.title}</Title>
          </Group>
          <Text ml={45}>{formData.service}</Text>
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
            <Box className="altPanel">
              <Title order={6} tt={"uppercase"}>
                Description:
              </Title>
              {formData.desc}
            </Box>
          </Stack>
          <Stack className="altPanel" gap={5} px={30}>
            <Box hidden={formData.type?.title !== "Design"}>
              <Group>
                <Image
                  className={classes.reviewIcon}
                  src="/img/colorPalette.svg"
                  alt={"Task Tags"}
                  fit="contain"
                  mt={7}
                  w={30}
                />
              </Group>
              <Group>
                <Image
                  className={classes.reviewIcon}
                  src="/img/hashtag.svg"
                  alt={"Task Tags"}
                  fit="contain"
                  mt={7}
                  w={30}
                />
              </Group>
            </Box>
            <Group>
              <Image
                className={classes.reviewIcon}
                src="/img/website.svg"
                alt={"Task Tags"}
                fit="contain"
                mt={7}
                w={30}
              />
            </Group>
            <Group>
              <Image
                className={classes.reviewIcon}
                src="/img/paperclip.svg"
                alt={"Task Tags"}
                fit="contain"
                mt={7}
                w={30}
              />
            </Group>
          </Stack>
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
              onClick={() => setSubmissionPanel(0)}
            >
              Back
            </Button>
            <Button
              leftSection={<FaFlagCheckered size={13} />}
              onClick={() => setSubmissionPanel(1)}
            >
              Submit
            </Button>
          </Group>
        </Stack>
      </Box>
    </motion.div>
  );
}
