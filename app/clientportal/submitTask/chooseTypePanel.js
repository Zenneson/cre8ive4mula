import {
  Box,
  Button,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { FaPlay } from "react-icons/fa";
import { TypeBtnsCache } from "../page";
import classes from "./styles/chooseTypePanel.module.css";

export default function ChooseTypePanel(props) {
  const { choosenType, serviceBadges, setActivePage } = props;

  return (
    <Stack mih={"700px"} gap={5}>
      <Group className={classes.chooseTypeTitleFrame} gap="7">
        <Image
          src={"/img/task.svg"}
          alt={"Task Type"}
          height={25}
          opacity={0.5}
        />
        <Title order={4}>Task Type</Title>
      </Group>
      <SimpleGrid cols={3} spacing={20}>
        <TypeBtnsCache />
      </SimpleGrid>
      <Transition
        mounted={choosenType}
        transition="scale-y"
        timingFunction="ease"
      >
        {(styles) => (
          <Box style={styles}>
            <Grid className={`panel ${classes.typeDescFrame}`}>
              <Grid.Col span="content">
                <Title tt={"uppercase"} order={2}>
                  {choosenType.title}
                </Title>
              </Grid.Col>
              <Grid.Col span="auto">
                <Text>{choosenType.desc}</Text>
              </Grid.Col>
            </Grid>
            <Group className={`panel ${classes.serviceBadgesFrame}`}>
              {serviceBadges}
            </Group>
            <Group justify="flex-end" mt={20}>
              <Button
                leftSection={<FaPlay size={10} />}
                onClick={() => setActivePage(1)}
              >
                Continue
              </Button>
            </Group>
          </Box>
        )}
      </Transition>
    </Stack>
  );
}
