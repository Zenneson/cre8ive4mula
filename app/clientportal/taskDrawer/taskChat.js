import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Image,
  Text,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { MdOutlineExpand } from "react-icons/md";
import { TbWorldQuestion } from "react-icons/tb";
import classes from "./styles/taskChat.module.css";

const Message = (props) => {
  const { speaker, message } = props;
  return (
    <Grid className={classes.message}>
      {speaker !== "user" && (
        <Grid.Col span={"content"}>
          <Box pos={"relative"} w={50} mih={50} h={"100%"}>
            {speaker === "bot" ? (
              <DotLottiePlayer src={"/img/botIcon.json"} autoplay loop />
            ) : (
              <Image
                top={-5}
                left={5}
                pos={"absolute"}
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
              top={-5}
              left={5}
              pos={"absolute"}
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

const ChatMessages = () => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(scrollToBottom, []);

  return (
    <Box className={`${classes.chatMessages}`}>
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
        <Message message={"This message is from the admin."} speaker="admin" />
        <Message message={"This message is from the user."} speaker="user" />
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default function TaskChat() {
  return (
    <Box className={`innerPanel ${classes.chatPanel}`} mt={20} mr={5}>
      <Box className={classes.chat} pos={"relative"} h={"100%"}>
        <ChatMessages />
        <Grid pos={"absolute"} w={"100%"} bottom={0}>
          <Grid.Col span={"content"}>
            <Button.Group
              className={classes.chatAltBtns}
              orientation="vertical"
            >
              <Tooltip label="Expand Chat">
                <Button>
                  <MdOutlineExpand size={18} />
                </Button>
              </Tooltip>
              <Tooltip label="Ask AI">
                <Button>
                  <TbWorldQuestion size={18} />
                </Button>
              </Tooltip>
            </Button.Group>
          </Grid.Col>
          <Grid.Col span={"auto"}>
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
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
}
