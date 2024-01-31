"use client";
import "@dotlottie/react-player/dist/index.css";
import { Affix, Badge, Button, Center, Group, Text } from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";
import { useState } from "react";
import ChooseTypePanel from "./chooseTypePanel";
import classes from "./styles/submitTask.module.css";
import TaskForm from "./taskForm";

export default function SubmitTask() {
  const [activePage, setActivePage] = useState(0);
  const [choosenType, setChoosenType] = useSessionStorage({
    key: "submitData",
    defaultValue: null,
  });

  const submitPage = () => {
    switch (activePage) {
      case 0:
        return "0px";
      case 1:
        return "-100vw";
      case 2:
        return "-200vw";
      case 3:
        return "-300vw";
      case 4:
        return "-400vw";
      case 5:
        return "-500vw";
      default:
        return "0px";
    }
  };

  const services = {
    design: [
      "Logo Design",
      "UX / UI Design",
      "Brand Identity",
      "Print Design",
      "Infographic Design",
      "Photoshop Editing",
      "Website / App Wireframing",
      "Social Media Posts",
      "Promotion Material",
      "CMS Theme Customization",
    ],
    content: [
      "Editing and Proofreading",
      "Marketing Copywriting",
      "SEO Optimization",
      "Content Transcribing ",
    ],
    webdev: [
      "Performance Optimization",
      "Feature Development",
      "API Development",
      "CMS Management",
      "Database Management",
      "Website Migration",
      "Security Optimization",
      "Bug Fixes and Troubleshooting",
      "Payment Gateway Integration",
    ],
  };

  const setup = () => {
    if (choosenType && choosenType.title === "Design")
      return { color: "#ff4d28", service: services.design, size: "xs" };
    if (choosenType && choosenType.title === "Content")
      return { color: "#f80800", service: services.content, size: "sm" };
    if (choosenType && choosenType.title === "Web Dev")
      return { color: "#ffd941", service: services.webdev, size: "xs" };
  };

  const setupData = setup();
  const serviceList = setupData?.service;
  const serviceBadges = serviceList?.map((service, i) => {
    return (
      <Badge
        key={i}
        color={setupData.color}
        size={setupData.size}
        variant="filled"
      >
        {service}
      </Badge>
    );
  });

  return (
    <Group className={classes.centerFrame} left={submitPage()} gap={"0px"}>
      <Affix position={{ top: 30, right: 30 }}>
        <Button.Group className={classes.nextPrev}>
          <Button
            onClick={() =>
              setActivePage((current) => (current > 0 ? current - 1 : current))
            }
          >
            Prev
          </Button>
          <Button
            onClick={() =>
              setActivePage((current) => (current < 2 ? current + 1 : current))
            }
          >
            Next
          </Button>
        </Button.Group>
      </Affix>

      <Center id="0" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <ChooseTypePanel
          choosenType={choosenType}
          serviceBadges={serviceBadges}
          setActivePage={setActivePage}
        />
      </Center>
      <Center id="1" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <TaskForm />
      </Center>
      <Center id="2" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <Text>Review Details</Text>
      </Center>
    </Group>
  );
}
