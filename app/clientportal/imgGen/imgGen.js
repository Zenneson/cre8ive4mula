import CustomLoader from "@libs/loader/customLoader";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Divider,
  Group,
  Image,
  Input,
  Popover,
  Text,
  Textarea,
  Title,
  Tooltip,
  Transition,
} from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useState } from "react";
import { CgFormatSlash } from "react-icons/cg";
import { FaQuestion } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { ImPaintFormat, ImSpinner11 } from "react-icons/im";
import { IoMdDownload } from "react-icons/io";
import {
  MdOutlineBlender,
  MdOutlineHighQuality,
  MdOutlineVrpano,
} from "react-icons/md";
import { TbExchange } from "react-icons/tb";
import { VscClearAll } from "react-icons/vsc";
import classes from "./styles/imgGen.module.css";

const imgGenOptions = [
  {
    label: "Reroll",
    icon: <ImSpinner11 size={18} />,
  },
  {
    label: "Upscale",
    icon: <MdOutlineHighQuality size={25} />,
  },
  {
    label: "Variation",
    icon: <TbExchange size={25} />,
  },
  {
    label: "Inpaint",
    icon: <HiOutlinePaintBrush size={25} />,
  },
  {
    label: "Outpaint",
    icon: <ImPaintFormat size={22} />,
  },
  {
    label: "Pan",
    icon: <MdOutlineVrpano size={25} />,
  },
  {
    label: "Blend",
    icon: <MdOutlineBlender size={25} />,
  },
];

export default function ImgGen() {
  const focusTrapRef = useFocusTrap();
  const [imgRendered, setImgRendered] = useState(false);

  const BottomBtn = (props) => {
    const { label, icon } = props;

    return (
      <Tooltip label={label}>
        <Button className={classes.imgGenOptionsBtns}>{icon}</Button>
      </Tooltip>
    );
  };

  const options = imgGenOptions.map((option) => {
    return (
      <BottomBtn key={option.label} label={option.label} icon={option.icon} />
    );
  });

  const helpAnimationProps = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 1 },
  };

  return (
    <>
      <Box className={classes.imgPromptInputFrame} ref={focusTrapRef}>
        <Group justify="space-between" mb={10}>
          <Group gap={7}>
            <Image
              className={classes.imgGenIcon}
              src={"/img/clientDashboard/imgGen/imgGen.svg"}
              alt="AI Image Generator"
              height={27}
            />
            <Title order={3} className={classes.imgGenTitle}>
              AI Image Generator
            </Title>
          </Group>
          <Group className={`altPanel ${classes.imgGenTopBtns}`}>
            {imgRendered && (
              <motion.div {...helpAnimationProps}>
                <Group>
                  <Tooltip label="More Information">
                    <Box className={classes.topBtnFrame}>
                      <FaQuestion size={12} />
                    </Box>
                  </Tooltip>
                  <Tooltip label="Reset">
                    <Box
                      className={classes.topBtnFrame}
                      onClick={() => setImgRendered(false)}
                      pos={"relative"}
                      top={3}
                    >
                      <VscClearAll size={18} />
                    </Box>
                  </Tooltip>
                </Group>
              </motion.div>
            )}
            <Tooltip label="Edit Aspect Ratio" offset={15}>
              <div>
                <Popover trapFocus offset={15} withArrow>
                  <Popover.Target>
                    <Title order={5}>16:9</Title>
                  </Popover.Target>
                  <Popover.Dropdown p={0}>
                    <Group c={"#000"} fw={700} gap={0}>
                      <Input
                        classNames={{
                          wrapper: classes.aspectRatioWrapper,
                          input: classes.aspectRatioInput,
                        }}
                        placeholder={"16"}
                      />
                      <CgFormatSlash
                        style={{
                          marginLeft: -20,
                          marginRight: -25,
                        }}
                        size={25}
                        stroke={2}
                      />
                      <Input
                        classNames={{
                          wrapper: classes.aspectRatioWrapper,
                          input: classes.aspectRatioInput,
                        }}
                        placeholder={"9"}
                      />
                    </Group>
                    <Button className={classes.applyRatioBtn}>Apply</Button>
                  </Popover.Dropdown>
                </Popover>
              </div>
            </Tooltip>
          </Group>
        </Group>
        <Textarea
          placeholder="Describe the desired image..."
          w={"100%"}
          minRows={5}
          data-autofocus
          autosize
        />
        <ActionIcon
          className={"innerPanel sendBtn"}
          variant="transparent"
          pos={"absolute"}
          right={8}
          bottom={8}
          p={22}
          onClick={() => setImgRendered(true)}
        >
          <Image
            src={"/img/clientDashboard/imgGen/pixelImg.svg"}
            alt="Generate Image"
            w={28}
            height={28}
          />
        </ActionIcon>
      </Box>
      <Box hidden={imgRendered} className={classes.imgGenHelpFrame}>
        <Text>
          To use the AI image generator, input desired parameters in the field
          above. An image will be generate based on the input. You may then
          refine or save the result as needed. The level of detail included in
          the prompt directly influences the degree of alignment between the
          generated result and the your desired outcome. You may also have the
          results edited as a task. Descibe the desired image in the above field
          and click the image icon or press &quot;Enter&quot; to generate the
          image.
        </Text>
      </Box>
      <Transition
        mounted={imgRendered}
        transition="scale-y"
        duration={500}
        timingFunction="ease"
      >
        {(styles) => (
          <Box style={styles}>
            <AspectRatio
              ratio={16 / 9}
              className={classes.imgGenAspectRatioFrame}
            >
              <Box className={`altPanel ${classes.imgGenPreviewFrame}`}>
                <CustomLoader mode={"imgGen"} />
              </Box>
            </AspectRatio>
            <Button.Group className={classes.imgGenOptionsBtnFrame}>
              {options}
            </Button.Group>
            <Divider w={"50%"} maw={1200} mx={"auto"} mt={20} opacity={0.15} />
            <Group className={classes.imgGenBottomBtnFrame} justify="flex-end">
              <Button size="xs" leftSection={<IoMdDownload size={15} />}>
                Download
              </Button>
              <Button size="xs" leftSection={<FiEdit3 size={15} />}>
                Request Edit
              </Button>
            </Group>
          </Box>
        )}
      </Transition>
    </>
  );
}
