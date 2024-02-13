import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import {
  ActionIcon,
  Box,
  Grid,
  Image,
  Stack,
  Text,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { usePortalState } from "../portalStore";
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
                src={"/img/botIcon.json"}
                loop
              />
            ) : (
              <Image
                className={classes.adminChatIcon}
                src="/img/adminChatIcon.svg"
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
              src="/img/userChatIcon.svg"
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
  exit: { opacity: 0 },
  transition: { delay: 0.1, duration: 0.3 },
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
    <Box
      className={`panel ${classes.chatPanel}`}
      h={`${
        drawerState === "init"
          ? "calc(40vh - 30px)"
          : drawerState === "showChat"
            ? "calc(100vh - 150px)"
            : "94px"
      }`}
      mt={20}
      mr={5}
    >
      <Box className={classes.chat} pos={"relative"} h={"100%"}>
        <AnimatePresence>
          <ChatMessages drawerState={drawerState} />
        </AnimatePresence>
        <Grid pos={"absolute"} mt={12} w={"100%"} bottom={0}>
          <Grid.Col span={"content"}>
            <Stack
              className={`altPanel ${classes.chatAltBtns}`}
              align="center"
              gap={12}
              p={11}
            >
              <Tooltip position="left" label="Expand Chat">
                <Image
                  src={
                    drawerState === "showChat"
                      ? "/img/reset.svg"
                      : "/img/expand.svg"
                  }
                  alt="Expand Chat"
                  my={3}
                  w={23}
                  h={23}
                  onClick={handleDrawerHeight}
                />
              </Tooltip>
              <AnimatePresence>
                {drawerState !== "showDetails" && (
                  <motion.div {...animationProps}>
                    <Tooltip position="left" label="Ask AI">
                      <Image
                        className={classes.aiAltBtn}
                        src="/img/aiBtn.svg"
                        alt="AI"
                        w={35}
                        h={35}
                      />
                    </Tooltip>
                  </motion.div>
                )}
              </AnimatePresence>
            </Stack>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <AnimatePresence>
              {drawerState !== "showDetails" && (
                <motion.div {...animationProps}>
                  <Textarea
                    classNames={{
                      wrapper: classes.inputWrapper,
                      input: classes.chatInput,
                    }}
                    placeholder="Type your message..."
                    w={"100%"}
                    minRows={4}
                    data-autofocus
                    autosize
                  />
                  <ActionIcon
                    className={`innerPanel ${classes.sendBtn}`}
                    variant="transparent"
                    pos={"absolute"}
                    right={5}
                    bottom={5}
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