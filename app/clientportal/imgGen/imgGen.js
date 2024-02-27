import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Image,
  Input,
  Popover,
  Textarea,
  Title,
  Tooltip,
} from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";
import { FaQuestion } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { ImPaintFormat, ImSpinner11 } from "react-icons/im";
import { MdOutlineBlender, MdOutlineVrpano } from "react-icons/md";
import { PiArrowSquareOutBold } from "react-icons/pi";
import { TbStatusChange } from "react-icons/tb";
import classes from "./styles/imgGen.module.css";

const imgGenOptions = [
  {
    label: "Reroll",
    icon: <ImSpinner11 size={20} />,
  },
  {
    label: "Upscale",
    icon: <PiArrowSquareOutBold size={20} />,
  },
  {
    label: "Variation",
    icon: <TbStatusChange size={20} />,
  },
  {
    label: "Inpaint",
    icon: <HiOutlinePaintBrush size={20} />,
  },
  {
    label: "Outpaint",
    icon: <ImPaintFormat size={20} />,
  },
  {
    label: "Pan",
    icon: <MdOutlineVrpano size={20} />,
  },
  {
    label: "Blend",
    icon: <MdOutlineBlender size={20} />,
  },
];

export default function ImgGen() {
  const focusTrapRef = useFocusTrap();

  const BottomBtn = (props) => {
    const { label, icon } = props;

    return (
      <Tooltip label={label}>
        <Button className={classes.imgGenBottomBtns}>{icon}</Button>
      </Tooltip>
    );
  };

  const options = imgGenOptions.map((option) => {
    return (
      <BottomBtn key={option.label} label={option.label} icon={option.icon} />
    );
  });

  return (
    <>
      <Box className={classes.imgPromptInputFrame} ref={focusTrapRef}>
        <Group justify="space-between" mb={10}>
          <Group gap={5}>
            <Image
              src={"/img/clientDashboard/imgGen/imgGen.svg"}
              alt="AI Image Generator"
              width={30}
              height={30}
            />
            <Title order={3} className={classes.imgGenTitle}>
              AI Image Generator
            </Title>
          </Group>
          <Group className={`altPanel ${classes.imgGenTopBtns}`}>
            <Tooltip label="More Information">
              <div>
                <FaQuestion size={12} />
              </div>
            </Tooltip>
            <Divider orientation="vertical" opacity={0.2} />
            <Tooltip label="Edit Aspect Ratio">
              <div>
                <Popover>
                  <Popover.Target>
                    <Title order={5}>1:1</Title>
                  </Popover.Target>
                  <Popover.Dropdown p={0}>
                    {/* TODO: Set focus to input after Click  */}
                    <Input className={classes.aspectRatioInput} value={"1:1"} />
                  </Popover.Dropdown>
                </Popover>
              </div>
            </Tooltip>
          </Group>
        </Group>
        <Textarea
          placeholder="Describe the desired image..."
          w={"100%"}
          minRows={6}
          data-autofocus
          autosize
        />
        <ActionIcon
          className={"innerPanel sendBtn"}
          variant="transparent"
          pos={"absolute"}
          right={8}
          bottom={8}
          size="xl"
        >
          <FaRegImage
            style={{
              transform: "scale(1.3)",
            }}
          />
        </ActionIcon>
      </Box>
      <Button.Group className={classes.imgGenBottomBtnFrame}>
        {options}
      </Button.Group>
    </>
  );
}
