import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import {
  ActionIcon,
  Badge,
  Box,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Textarea,
  Title,
  Tooltip,
} from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { BsChatLeftQuote } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { LuClock2 } from "react-icons/lu";
import { PiQuotesFill } from "react-icons/pi";
import { usePortalState } from "../../portalStore";
import classes from "./styles/taskChat.module.css";

const Message = (props) => {
  const { speaker, message } = props;
  return (
    <Grid className={classes.message}>
      {speaker !== "user" && (
        <Grid.Col span={"content"}>
          <Box pos={"relative"} w={50} mih={50} h={"100%"}>
            {speaker === "bot" ? (
              <DotLottiePlayer
                className={classes.botChatIcon}
                src={"/img/clientDashboard/drawer/botIcon.json"}
                loop
              />
            ) : (
              <Image
                className={classes.adminChatIcon}
                src="/img/clientDashboard/drawer/adminChatIcon.svg"
                alt="admin"
                w={40}
                h={40}
              />
            )}
          </Box>
        </Grid.Col>
      )}
      <Grid.Col span={"auto"}>
        <Box
          className={`${classes.messageBubble} ${
            speaker === "user" && classes.userBubble
          }`}
          ml={speaker === "user" ? "auto" : 0}
          w="85%"
        >
          <Text fz={14}>{message}</Text>
        </Box>
      </Grid.Col>
      {speaker === "user" && (
        <Grid.Col span={"content"}>
          <Box pos={"relative"} w={50} mih={50} h={"100%"}>
            <Image
              className={classes.userChatIcon}
              src="/img/clientDashboard/drawer/userChatIcon.svg"
              alt="admin"
              w={40}
              h={40}
            />
          </Box>
        </Grid.Col>
      )}
    </Grid>
  );
};

const animationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0 } },
  transition: { delay: 0.2, duration: 1 },
};

const ChatMessages = (props) => {
  const { drawerState } = props;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(scrollToBottom, []);

  return (
    drawerState !== "showDetails" && (
      <Box
        className={`${classes.chatMessages}`}
        component={motion.div}
        {...animationProps}
      >
        <Badge
          className={classes.labelBadge}
          size="xs"
          variant="gradient"
          gradient={{ from: "#8fbaeb", to: "#7fb1ea", deg: 180 }}
        >
          Chat
        </Badge>
        <Box
          className={`altPanel ${classes.shadow}`}
          pos="absolute"
          top={-1}
          left={0}
          w={"100%"}
          h={"100%"}
        />
        <Box className={classes.messagesInnerFrame}>
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message message={"This message is from the user."} speaker="user" />
          <Message message={"This message is from the bot."} speaker="bot" />
          <Message
            message={"This message is from the admin."}
            speaker="admin"
          />
          <Message message={"This message is from the user."} speaker="user" />
          <div ref={messagesEndRef} />
        </Box>
      </Box>
    )
  );
};

export default function TaskChat() {
  const { drawerState, setDrawerState } = usePortalState();

  const handleDrawerHeight = () => {
    const action = drawerState !== "showChat" ? "showChat" : "init";
    setDrawerState(action);
  };

  return (
    <Box className={`panel ${classes.chatPanel}`} mt={20} mr={5}>
      <Box pos={"relative"} h={"100%"}>
        <AnimatePresence>
          <ChatMessages drawerState={drawerState} />
        </AnimatePresence>
        <Grid pos={"absolute"} mt={12} w={"100%"} bottom={0}>
          <Grid.Col span={"content"}>
            <Group>
              <Stack
                className={`altPanel ${classes.chatAltBtns}`}
                align="center"
                gap={12}
                p={11}
              >
                <AnimatePresence>
                  {drawerState !== "showDetails" && (
                    <motion.div {...animationProps}>
                      <Tooltip position="left" label="AI Assistant">
                        <Image
                          src="/img/clientDashboard/drawer/aiBtn.svg"
                          alt="AI"
                          w={25}
                          h={35}
                        />
                      </Tooltip>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Group>
                  <Tooltip
                    position="left"
                    label={drawerState === "showChat" ? "Reset" : "Expand Chat"}
                  >
                    <Image
                      src={
                        drawerState === "showChat"
                          ? "/img/clientDashboard/drawer/reset.svg"
                          : "/img/clientDashboard/drawer/expand.svg"
                      }
                      alt="Expand Chat"
                      my={3}
                      w={25}
                      h={25}
                      onClick={handleDrawerHeight}
                    />
                  </Tooltip>
                  <AnimatePresence>
                    {drawerState === "showDetails" && (
                      <motion.div {...animationProps}>
                        <Tooltip position="left" label="AI Assistant">
                          <Image
                            src="/img/clientDashboard/drawer/aiBtn.svg"
                            alt="AI"
                            w={25}
                            h={35}
                          />
                        </Tooltip>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Group>
              </Stack>
              <AnimatePresence>
                {drawerState === "showDetails" && (
                  <Stack
                    className={classes.chatDetails}
                    component={motion.div}
                    {...animationProps}
                    gap={0}
                  >
                    <Group gap={5} mb={-2} align="flex-end">
                      <BsChatLeftQuote opacity={0.5} />
                      <Title tt={"uppercase"} order={6} fz={14}>
                        Task Discussion
                      </Title>
                    </Group>
                    <Group gap={0} ml={22} mb={-2}>
                      <PiQuotesFill size={15} />
                      <Text
                        ml={6}
                        fz={14}
                        c={"cobaltblue.9"}
                        fs={"italic"}
                        lineClamp={1}
                        maw={750}
                      >
                        <Text
                          fw={900}
                          fz={10}
                          c={"#fff"}
                          tt={"uppercase"}
                          component="span"
                          fs={"normal"}
                        >
                          Last Message:
                        </Text>{" "}
                        Are these all the details needed in the graphic?
                      </Text>
                    </Group>
                    <Group gap={0} ml={22} mb={-5}>
                      <LuClock2 size={15} />
                      <Text fz={14} ml={4} mr={10} c={"cobaltblue.9"}>
                        <Text
                          fw={900}
                          fz={10}
                          c={"#fff"}
                          tt={"uppercase"}
                          component="span"
                        >
                          <Text
                            fw={400}
                            fz={12}
                            mr={15}
                            c={"cobaltblue.9"}
                            tt={"uppercase"}
                            component="span"
                            fs={"normal"}
                          >
                            Tues FEb 27, 2024 | 12:00 PM EST
                          </Text>
                          <FaRegUserCircle
                            style={{
                              verticalAlign: "middle",
                              marginBottom: "2px",
                              marginRight: "3px",
                            }}
                            size={14}
                          />
                        </Text>{" "}
                        zenneson@gmail.com
                      </Text>
                    </Group>
                  </Stack>
                )}
              </AnimatePresence>
            </Group>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <AnimatePresence>
              {drawerState !== "showDetails" && (
                <motion.div {...animationProps}>
                  <Textarea
                    placeholder="Type your message..."
                    w={"100%"}
                    minRows={4}
                    data-autofocus
                    autosize
                    mt={2}
                  />
                  <ActionIcon
                    className={"innerPanel sendBtn"}
                    variant="transparent"
                    pos={"absolute"}
                    right={8}
                    bottom={8}
                    size="xl"
                  >
                    <IoSend />
                  </ActionIcon>
                </motion.div>
              )}
            </AnimatePresence>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
}
